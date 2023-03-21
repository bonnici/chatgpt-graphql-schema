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
const CHATGPT_TIMEOUT = 30 * 1000; // 30 seconds

const log = {
  error: (str) => console.error(chalk.red(str)),
  info: (str) => console.info(chalk.white(str)),
  debug: (str) => { if (process.env.SHOW_DEBUG === "true") console.info(chalk.dim(str)) },
  response: (str) => console.info(chalk.bold(`< ${str}`)),
}

if (process.argv.length !== 3) {
  log.error(`Run with: npm start -- https://graphql.endpoint.com/`);
  process.exit(1);
}

const endpoint = process.argv[2];

log.debug(`Getting schema from ${endpoint} ...`);

var introspectionResult = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: getIntrospectionQuery() })
});
var introspectionResultJson = await introspectionResult.json()
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
const queryPrompt = 'I am going to give you a GraphQL SDL schema document and ask you to generate GraphQL queries for me. ' + 
  "Your responses should include a code block the full query text I should use to get the information I'm asking for.";
const interpretPrompt = 'I am going to give you a GraphQL SDL schema document and ask you to explain the GraphQL query results ' +
  'that I got back from the server. The explanations should be in plain English.';
const schemaBlock = 'Here is the schema:\n```' + sdlString + '\n```';
var queryMessages = [{ role: 'system', content: `${queryPrompt} ${schemaBlock}` }];
var interpretMessages = [{ role: 'system', content: `${interpretPrompt} ${schemaBlock}` }];
log.debug('Successfully initialised ChatGPT');

const rl = readline.createInterface({ input, output });

while (true) {
  const question = await rl.question(chalk.white('Ask a question or type "exit" to quit' + chalk.bold('\n> ')));
  if (question === 'exit' || question === 'quit') {
    process.exit(0);
  }

  const trimmed = question.trim();
  if (!trimmed) {
    continue;
  }

  queryMessages.push({ role: 'user', content: trimmed});
  
  log.debug('Sending question to ChatGPT ...');
  var queryChatMessage;
  try {
    const chatResponse = await openai.createChatCompletion({ model: 'gpt-3.5-turbo', messages: queryMessages }, { timeout: CHATGPT_TIMEOUT });
    queryChatMessage = chatResponse.data.choices[0].message;
    queryMessages.push(queryChatMessage);
  } catch (e) {
    log.error(`Error sending question to ChatGPT: ${e.message}`);
    continue;
  }

  log.response(queryChatMessage.content);

  const codeBlocks = queryChatMessage.content.match(/```(graphql)?(?<query>[\s\S]+)```/);
  const graphQlQuery = codeBlocks?.groups?.query;
  if (!graphQlQuery) {
    continue;
  }
  log.debug(`GraphQL request: ${graphQlQuery}`);

  log.debug(`Querying GraphQL endpoint ${endpoint} ...`);
  var queryResult = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: graphQlQuery })
  });
  var queryResultJson = await queryResult.json()
  const queryResultString = JSON.stringify(queryResultJson);
  log.info(`GraphQL response: ${queryResultString}`);

  if (queryResultJson.errors) {
    continue;
  }

  interpretMessages.push({ role: 'user', content: `I sent this query:\n\`\`\`${graphQlQuery}\n\`\`\`\n and got this response:\n\`\`\`${queryResultString}\n\`\`\`\nWhat do the contents of that response mean in plain english?`});
  log.debug('Asking ChatGPT to interpret the results ...');
  var intepretChatMessage;
  try {
    const chatResponse = await openai.createChatCompletion({ model: 'gpt-3.5-turbo', messages: interpretMessages }, { timeout: CHATGPT_TIMEOUT });
    intepretChatMessage = chatResponse.data.choices[0].message;
    interpretMessages.push(intepretChatMessage);
  } catch (e) {
    log.error(`Error asking ChatGPT to interpret the results: ${e.message}`);
    continue;
  }

  log.response(intepretChatMessage.content);
}
