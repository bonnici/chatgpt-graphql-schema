import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import * as dotenv from 'dotenv'
import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';
import { Configuration, OpenAIApi } from 'openai';
import { encode } from 'gpt-3-encoder';
import chalk from 'chalk';

dotenv.config()

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
if (charCount > 100000) {
  log.error(`Too many characters in schema (${charCount})`);
  process.exit(1);
}
const graphqlSchemaObj = buildClientSchema(introspectionResultJson.data);
const sdlString = printSchema(graphqlSchemaObj);
log.debug('Successfully loaded GraphQL SDL');

log.debug('Initialising ChatGPT ...');
const tokens = encode(sdlString)
if (tokens.length > 3000) {
  log.error(`Too many tokens in schema (${tokens.length})`);
  process.exit(1);
} else {
  // $0.002 (0.2c) per 1k tokens
  const cents = 0.2 * tokens.length / 1000
  log.info(`${tokens.length} tokens in schema, each question will cost about ${cents.toFixed(2)} cents`);
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// todo tweak this to get a more standard response - maybe put SDL in system?
// or just lean into the fact that it's not always a standard response and output it nicer (good example is using chatgpt to describe a query)
// could just try to find things inside of ```
var messages = [
  { role: 'system', content: 'I am going to give you a GraphQL SDL schema document and ask you to generate GraphQL queries for me. Your responses should only ever be the full query text.' },
  { role: 'user', content: sdlString},
];
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

  messages = [...messages, { role: 'user', content: trimmed}];
  
  log.debug('Sending question to ChatGPT ...');
  var chatMessage;
  try {
    const chatResponse = await openai.createChatCompletion({ model: 'gpt-3.5-turbo', messages }, { timeout: 10000 });
    chatMessage = chatResponse.data.choices[0].message;
    messages = [...messages, chatMessage];
  } catch (e) {
    log.error(`Error sending question to ChatGPT: ${e.message}`);
    continue;
  }

  /*
  var query = '';
  try {
    var messageJson = JSON.parse(chatMessage.content);
    query = messageJson.query;
  } catch (e) {
    log.error(`ChatGPT did not respond with valid JSON: ${chatMessage.content} (${e.message})`);
    continue;
  }
  */

  const query = chatMessage.content.trim().replace('```', '');
  if (!query.startsWith('query') && !query.startsWith('mutation') && !query.startsWith('{')) {
    log.error(`ChatGPT did not respond with a valid GraphQL operation: ${chatMessage.content}`);
    continue;
  }

  log.response(query);

  log.debug(`Querying GraphQL endpoint ${endpoint} ...`);
  var queryResult = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  var queryResultJson = await queryResult.json()
  log.info(`GraphQL response: ${JSON.stringify(queryResultJson)}`);

  messages = [...messages, { role: 'user', content: `Can you translate this query result to plain english for me?\n\`\`\`${queryResultJson}\`\`\``}];
  log.debug('Asking ChatGPT to interpret the results ...');
  var chatMessage;
  try {
    const chatResponse = await openai.createChatCompletion({ model: 'gpt-3.5-turbo', messages }, { timeout: 10000 });
    chatMessage = chatResponse.data.choices[0].message;
    messages = [...messages, chatMessage];
  } catch (e) {
    log.error(`Error asking ChatGPT to interpret the results: ${e.message}`);
    continue;
  }

  log.response(chatMessage.content);
}
