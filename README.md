# ChatGPT GraphQL Schema

To run: `npm start -- https://countries.trevorblades.com/`, but it must be an unauthenticated and relatively small public API.

## Working endpoints
* `https://countries.trevorblades.com/` - basic country data
* `https://space-courses-api.herokuapp.com/` - fake Odyssey courses
* `https://rickandmortyapi.com/graphql` - rick and morty
* `https://comet-cruises-api.herokuapp.com/` - tiny example locations service
* `https://comet-cruises-activities.herokuapp.com/` - tiny example activities service
* `https://api.react-finland.fi/graphql` - data about react conferences in finland
* `https://barcelona-urban-mobility-graphql-api.netlify.app/graphql` - data about bike/metro/bus stations in barcelona
* `https://fruits-api.netlify.app/graphql` - fruit info

## Non-working endpoints
* `npm start -- https://graphql.anilist.co/` - too many tokens (43562)
* `https://api.github.com/graphql` - needs authentication and almost definitely too big
* `https://beta.pokeapi.co/graphql/v1beta` - too many characters (5640630)
* `https://api.apollographql.com/graphql` - no introspection?
* `http://api.catalysis-hub.org/graphql` - too many tokens (78686)
* `https://api.digitransit.fi/routing/v1/routers/finland/index/graphql` - Too many characters in schema (150607)
* `https://api.ean-search.org/graphql` - needs auth
* `https://api.stratz.com/graphql` - needs auth?
* `https://tmdb.apps.quintero.io/` - Too many characters in schema (155243) (5874 tokens)
* `https://linkedsdg.officialstatistics.org/graphql` - Too many characters in schema (194040)

## Example output

```
Getting schema from https://countries.trevorblades.com/ ...
Successfully loaded GraphQL SDL
Initialising ChatGPT ...
533 tokens in schema, each question will cost about 0.11 cents
Successfully initialised ChatGPT
Ask a question or type "exit" to quit
> what's the capital of cuba and what currency do they use?
Sending question to ChatGPT ...
GraphQL query from ChatGPT: {
  country(code: "CU") {
    capital
    currency
  }
}
Querying GraphQL endpoint https://countries.trevorblades.com/ ...
GraphQL response: {"data":{"country":{"capital":"Havana","currency":"CUC,CUP"}}}
Ask a question or type "exit" to quit
> exit
```

```
> can you translate that result to plain english for me?
Sending question to ChatGPT ...
ChatGPT did not respond with a valid GraphQL operation: Certainly! The query is asking the server to search for products containing the name "Bananaboat". It specifies that the search should be done in the English language (indicated by the "language" parameter being set to 1). It also specifies that the results should be returned one page at a time, with the first page being requested (indicated by the "page" parameter being set to 1). Finally, the query asks for the "categoryId", "categoryName", "ean", "issuingCountry", and "name" fields for each product that matches the search criteria
```

```
Getting schema from https://barcelona-urban-mobility-graphql-api.netlify.app/graphql ...
Successfully loaded GraphQL SDL
Initialising ChatGPT ...
2262 tokens in schema, each question will cost about 0.45 cents
Successfully initialised ChatGPT
Ask a question or type "exit" to quit
> where is the Barceloneta station?
Sending question to ChatGPT ...
GraphQL query from ChatGPT: {
  metroStation(findBy: {name: "Barceloneta"}) {
    ... on MetroStation {
      name
      coordinates {
        latitude
        longitude
      }
    }
    ... on NotFoundError {
      params
    }
  }
}
Querying GraphQL endpoint https://barcelona-urban-mobility-graphql-api.netlify.app/graphql ...
GraphQL response: {"data":{"metroStation":{"name":"Barceloneta","coordinates":{"latitude":41.381811,"longitude":2.184787}}}}
```