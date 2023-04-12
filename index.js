import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as dotenv from 'dotenv'
import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';
import { Configuration, OpenAIApi } from 'openai';
import { encode } from 'gpt-3-encoder';
import chalk from 'chalk';

dotenv.config()

const MAX_SCHEMA_CHARS = 100000;
const MAX_SCHEMA_TOKENS = 3000;
const COST_PER_TOKEN = 0.2 / 1000; // $0.002 (0.2c) per 1k tokens
const CHATGPT_TIMEOUT = 60 * 1000; // 1 minute

const log = {
  error: (str) => console.error(chalk.red(str)),
  info: (str) => console.info(chalk.white(str)),
  debug: (str) => { if (process.env.HIDE_DEBUG !== "true") console.info(chalk.dim(str)) },
  response: (str) => console.info(chalk.bold(str)),
}

if (process.argv.length !== 3) {
  log.error(`Run with: npm start -- https://graphql.endpoint.com/`);
  process.exit(1);
}

const endpoint = process.argv[2];

log.debug(`Getting schema from ${endpoint} ...`);

let introspectionResult = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: getIntrospectionQuery() })
});
let introspectionResultJson = await introspectionResult.json()
const charCount = JSON.stringify(introspectionResultJson.data).length;
if (charCount > MAX_SCHEMA_CHARS) {
  log.error(`Too many characters in schema (${charCount})`);
  process.exit(1);
}
const graphqlSchemaObj = buildClientSchema(introspectionResultJson.data);
const sdlString = printSchema(graphqlSchemaObj);
log.debug('Successfully loaded GraphQL SDL');

log.debug('Initialising ChatGPT ...');
const tokens = encode(sdlString)
if (tokens.length > MAX_SCHEMA_TOKENS) {
  log.error(`Too many tokens in schema (${tokens.length})`);
  process.exit(1);
} else {
  
  const cents = COST_PER_TOKEN * tokens.length * 2; // 2 chat requests per question
  log.info(`${tokens.length} tokens in schema, each question will cost about ${cents.toFixed(2)} cents`);
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const querySystemPrompt = "I am going to give you a GraphQL SDL schema document and ask you to generate GraphQL queries for me, " +
"then I'll send you the JSON response I recieved from the API for that query and ask you to explain the results in English. " + 
"When asked for a GraphQL query, you should only respond with the full query text I should use, and when asked to explain the " +
"results, you should respond with a plain English description of the contents of the response.";
const sampleSchema = `Here is the schema:
\`\`\`
type Query {
  users: [User!]!
  user(id: ID!): User
}

type Mutation {
  createUser(name: String!): User!
}

type User {
  id: ID!
  name: String!
}
\`\`\``;
const queryQuestion = (question) => `What GraphQL query should I send to answer the question: ${question}`
const sampleQueryResponse = `\`\`\`
{
  user(id: 2) {
    name
  }
}\`\`\``;
const explainQuestion = (response) => `I sent that query and got this response: \`${response}\`. Translate that response to English.`;
const sampleExplainResponse = 'The name of the user with ID 2 is "Nick Marsh".';
const schemaBlock = 'Here is another schema, from now on only use this schema when creating queries and explaining results:\n```\n' + sdlString + '\n```';
let chatMessages = [
  { role: 'system', content: querySystemPrompt }, 
  { role: 'system', content: sampleSchema }, 
  { role: 'user', content: queryQuestion('what is the name of user 2?') }, 
  { role: 'assistant', content: sampleQueryResponse },
  { role: 'user', content: explainQuestion('{"data":{"user":{"name":"Nick Marsh"}}}') }, 
  { role: 'assistant', content: sampleExplainResponse },
  { role: 'system', content: schemaBlock }
];
log.debug('Successfully initialised ChatGPT');

const rl = readline.createInterface({ input, output });

async function parseAndPostQuery(messageContent, shouldRetry) {
  const codeBlocks = messageContent.match(/```(graphql)?(?<query>(\n|.)*?)```/m);
  const graphQlQuery = codeBlocks?.groups?.query;
  if (!graphQlQuery) {
    return null;
  }
  log.debug(`GraphQL request: ${graphQlQuery}`);

  log.debug(`Querying GraphQL endpoint ${endpoint} ...`);
  let queryResult = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: graphQlQuery })
  });
  let queryResultJson = await queryResult.json()
  const queryResultString = JSON.stringify(queryResultJson);
  log.info(`\nResponse from GraphQL endpoint:\n${queryResultString}`);
  
  if (!queryResultJson.errors) {
    return queryResultString;
  }

  if (!shouldRetry) {
    return null;
  }

  log.debug('Response contained errors, asking for correction');

  chatMessages.push({ role: 'user', content: `That query doesn't work on the schema I provided, can you try again? I got this error response when I sent the query to the API: \`${queryResultString}\`` });
  let correctionChatMessage;
  try {
    const chatResponse = await openai.createChatCompletion({ model: 'gpt-3.5-turbo', messages: chatMessages }, { timeout: CHATGPT_TIMEOUT });
    correctionChatMessage = chatResponse.data.choices[0].message;
    chatMessages.push(correctionChatMessage);
  } catch (e) {
    log.error(`Error asking ChatGPT for query correction: ${e.message}`);
    return null;
  }
  
  log.response(`\nCorrected GraphQL query from ChatGPT:\n${correctionChatMessage.content}`);
  const correctedResponse = await parseAndPostQuery(correctionChatMessage.content, false);

  if (correctedResponse === null) {
    log.debug('Response contained errors, so going back to user input');
    return null;
  } else {
    return correctedResponse;
  }
}

while (true) {
  const question = await rl.question(chalk.bold('\nUser input:\n> '));
  if (question === 'exit' || question === 'quit') {
    process.exit(0);
  }

  const trimmed = question.trim();
  if (!trimmed) {
    continue;
  }

  const queryQuestionMessage = queryQuestion(trimmed);
  chatMessages.push({ role: 'user', content: queryQuestionMessage });
  
  log.debug(`Sending question to ChatGPT: ${queryQuestionMessage}`);
  let queryChatMessage;
  try {
    const chatResponse = await openai.createChatCompletion({ model: 'gpt-3.5-turbo', messages: chatMessages }, { timeout: CHATGPT_TIMEOUT });
    queryChatMessage = chatResponse.data.choices[0].message;
    chatMessages.push(queryChatMessage);
  } catch (e) {
    log.error(`Error sending question to ChatGPT: ${e.message}`);
    continue;
  }

  log.response(`\nGraphQL query from ChatGPT:\n${queryChatMessage.content}`);
  const queryResultsString = await parseAndPostQuery(queryChatMessage.content, true);

  if (!queryResultsString) {
    log.debug('Could not get a good response, so going back to user input');
    continue;
  }

  const explainQuestionMessage = explainQuestion(queryResultsString);
  chatMessages.push({ role: 'user', content: explainQuestionMessage });

  log.debug(`Asking ChatGPT to interpret the results: ${explainQuestionMessage}`);
  let intepretChatMessage;
  try {
    const chatResponse = await openai.createChatCompletion({ model: 'gpt-3.5-turbo', messages: chatMessages }, { timeout: CHATGPT_TIMEOUT });
    intepretChatMessage = chatResponse.data.choices[0].message;
    chatMessages.push(intepretChatMessage);
  } catch (e) {
    log.error(`Error asking ChatGPT to interpret the results: ${e.message}`);
    continue;
  }

  log.response(`\nChatGPT's interpretation of response:\n${intepretChatMessage.content}`);
}
