import * as dotenv from 'dotenv'
import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';
import { Configuration, OpenAIApi } from 'openai';
import { encode, decode } from 'gpt-3-encoder';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

dotenv.config()

if (process.argv.length !== 3) {
  console.error(`Run with: npm start -- https://graphql.endpoint.com/`);
  process.exit(1);
}

const endpoint = process.argv[2];

console.log(`Getting schema from ${endpoint} ...`);

var introspectionResult = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: getIntrospectionQuery() })
});
var introspectionResultJson = await introspectionResult.json()
const charCount = JSON.stringify(introspectionResultJson.data).length;
if (charCount > 30000) {
  console.log(`Too many characters in schema (${charCount})`);
  process.exit(1);
}
const graphqlSchemaObj = buildClientSchema(introspectionResultJson.data);
const sdlString = printSchema(graphqlSchemaObj);
console.log('Successfully loaded GraphQL SDL');

console.log('Initialising ChatGPT ...');
const tokens = encode(sdlString)
if (tokens.length > 3000) {
  console.log(`Too many tokens in schema (${tokens.length})`);
  process.exit(1);
} else {
  // $0.002 (0.2c) per 1k tokens
  const cents = 0.2 * tokens.length / 1000
  console.log(`${tokens.length} tokens in schema, each question will cost about ${cents.toFixed(2)} cents`);
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
var messages = [
  { role: 'system', content: 'I am going to give you a GraphQL SDL schema document and ask you to generate GraphQL queries for me. Your responses should only ever be the full query text with no other commentart.'}, 
  { role: 'user', content: sdlString},
];
console.log('Successfully initialised ChatGPT');

const rl = readline.createInterface({ input, output });

while (true) {
  const question = await rl.question('Ask a question or type "exit" to quit\n> ');
  if (question === 'exit') {
    process.exit(0);
  }

  const trimmed = question.trim();
  if (!trimmed) {
    continue;
  }

  messages = [...messages, { role: 'user', content: trimmed}];
  
  console.log('Sending question to ChatGPT ...');
  const chatResponse = await openai.createChatCompletion({ model: 'gpt-3.5-turbo', messages });
  const chatMessage = chatResponse.data.choices[0].message;
  messages = [...messages, chatMessage];

  if (!chatMessage.content.startsWith('query') && !chatMessage.content.startsWith('mutation')) {
    console.log(`ChatGPT did not respond with a query or mutation: ${chatMessage.content}`);
    continue;
  }

  console.log(`GraphQL query from ChatGPT: ${chatMessage.content}`);

  console.log(`Querying GraphQL endpoint ${endpoint} ...`);
  var queryResult = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: chatMessage.content })
  });
  var queryResultJson = await queryResult.json()
  console.log(`GraphQL response: ${JSON.stringify(queryResultJson)}`);
}
