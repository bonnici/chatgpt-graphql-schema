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
Getting schema from https://barcelona-urban-mobility-graphql-api.netlify.app/graphql ...
Successfully loaded GraphQL SDL
Initialising ChatGPT ...
2262 tokens in schema, each question will cost about 0.90 cents
Successfully initialised ChatGPT
Ask a question or type "exit" to quit
> what's the address of the first 2 bus stops?
Sending question to ChatGPT ...
< Here's a query to retrieve the address of the first 2 bus stops:

\`\`\`
query {
  busStops(first: 2) {
    edges {
      node {
        name
        location {
          address
        }
      }
    }
  }
}
\`\`\` 

This will return the name and address of the first 2 bus stops in the system.
GraphQL request: 
query {
  busStops(first: 2) {
    edges {
      node {
        name
        location {
          address
        }
      }
    }
  }
}

Querying GraphQL endpoint https://barcelona-urban-mobility-graphql-api.netlify.app/graphql ...
GraphQL response: {"data":{"busStops":{"edges":[{"node":{"name":"Meridiana - Av Rio de Janeiro","location":{"address":"Av. Meridiana, 503-505"}}},{"node":{"name":"Meridiana - Ctra de Ribes","location":{"address":"Av. Meridiana, s/n"}}}]}}}
Asking ChatGPT to interpret the results ...
< You sent a GraphQL query to get information about bus stops in Barcelona. Specifically, you asked for the names and addresses of the first two bus stops. The server returned a JSON object with the requested data, which includes an array of two objects. Each object has a "node" property that contains the name and address of a bus stop. The first bus stop is named "Meridiana - Av Rio de Janeiro" and has an address of "Av. Meridiana, 503-505". The second bus stop is named "Meridiana - Ctra de Ribes" and has an address of "Av. Meridiana, s/n".
```

```
Getting schema from https://countries.trevorblades.com/ ...
Successfully loaded GraphQL SDL
Initialising ChatGPT ...
374 tokens in schema, each question will cost about 0.15 cents
Successfully initialised ChatGPT
Ask a question or type "exit" to quit
> what's the capital of luxemburg?
Sending question to ChatGPT ...
< Here's the GraphQL query to get the capital of Luxembourg from the schema:
\`\`\`graphql
query {
  country(code: "LU") {
    capital
  }
}
\`\`\`
GraphQL request: 
query {
  country(code: "LU") {
    capital
  }
}

Querying GraphQL endpoint https://countries.trevorblades.com/ ...
GraphQL response: {"data":{"country":{"capital":"Luxembourg"}}}
Asking ChatGPT to interpret the results ...
< The GraphQL server sent back a response with a JSON object containing the `capital` of the `country` with the `code` of "LU" (which is Luxembourg). The capital of Luxembourg is "Luxembourg", so the value of the `capital` field in the response is "Luxembourg".
Ask a question or type "exit" to quit
> what currency do they use and what language do they speak?
Sending question to ChatGPT ...
< Here's the GraphQL query to get the currency and language of Luxembourg from the schema:
\`\`\`graphql
query {
  country(code: "LU") {
    currency
    languages {
      name
    }
  }
}
\`\`\`
GraphQL request: 
query {
  country(code: "LU") {
    currency
    languages {
      name
    }
  }
}

Querying GraphQL endpoint https://countries.trevorblades.com/ ...
GraphQL response: {"data":{"country":{"currency":"EUR","languages":[{"name":"French"},{"name":"German"},{"name":"Luxembourgish"}]}}}
Asking ChatGPT to interpret the results ...
< The GraphQL server sent back a response with a JSON object containing the `currency` and `languages` of the `country` with the `code` of "LU" (which is Luxembourg). The `currency` of Luxembourg is "EUR" (which stands for Euro), so the value of the `currency` field in the response is "EUR". The `languages` field is an array of objects with the `name` of each of the languages spoken in Luxembourg. The array contains three objects, each with a single field `name`. The names of the three languages are "French", "German" and "Luxembourgish".
```


```
Getting schema from https://fruits-api.netlify.app/graphql ...
Successfully loaded GraphQL SDL
Initialising ChatGPT ...
472 tokens in schema, each question will cost about 0.19 cents
Successfully initialised ChatGPT
Ask a question or type "exit" to quit
> what are the ids and names of all the fruit?
Sending question to ChatGPT ...
< Here is the GraphQL query that will give you the IDs and names of all the fruits:

\`\`\`graphql
query {
  fruits {
    id
    fruit_name
  }
}
\`\`\`
GraphQL request: 
query {
  fruits {
    id
    fruit_name
  }
}

Querying GraphQL endpoint https://fruits-api.netlify.app/graphql ...
GraphQL response: {"data":{"fruits":[{"id":"1","fruit_name":"Manzana"},{"id":"2","fruit_name":"Pera"},{"id":"3","fruit_name":"Banana"},{"id":"4","fruit_name":"Limón"},{"id":"5","fruit_name":"Mandarina"},{"id":"6","fruit_name":"Naranja"},{"id":"7","fruit_name":"Pomelo"},{"id":"8","fruit_name":"Damasco"},{"id":"9","fruit_name":"Ciruela"},{"id":"10","fruit_name":"Durazno"},{"id":"11","fruit_name":"Níspero"},{"id":"12","fruit_name":"Pitahaya"},{"id":"13","fruit_name":"Tamarindo"},{"id":"14","fruit_name":"Mango"},{"id":"15","fruit_name":"Guanábana"},{"id":"16","fruit_name":"Cereza"},{"id":"17","fruit_name":"Guayabas"},{"id":"18","fruit_name":"Aguacate (o palta)"},{"id":"19","fruit_name":"Coco"},{"id":"20","fruit_name":"Carambola"},{"id":"21","fruit_name":"Higo"},{"id":"22","fruit_name":"Granada"},{"id":"23","fruit_name":"Aceituna"},{"id":"24","fruit_name":"Lichi"},{"id":"25","fruit_name":"Durián"},{"id":"26","fruit_name":"Yaca"},{"id":"27","fruit_name":"Mangostino"},{"id":"28","fruit_name":"pomegranate"},{"id":"29","fruit_name":"pineapple"},{"id":"30","fruit_name":"Persimmon Fruit"},{"id":"31","fruit_name":"kiwi"},{"id":"32","fruit_name":"cereza de monte o capulín"},{"id":"33","fruit_name":"limetta dulce, limón dulce, lima dulce y/o simplemente lima"},{"id":"34","fruit_name":"cuajiniquil, cuijinicuil, cuinicuil o vaina"},{"id":"35","fruit_name":"Almendra"},{"id":"36","fruit_name":"Nuez"},{"id":"37","fruit_name":"Avellana"},{"id":"38","fruit_name":"Tejocote"}]}}
Asking ChatGPT to interpret the results ...
< The GraphQL query that you sent requested a list of all `fruits`. The response you received is a JSON object containing an array with all the fruits and their corresponding `id` and `fruit_name` properties. Each fruit in the array has an `id` and a `fruit_name` which correspond to the unique identifier and the name of that particular fruit respectively.
Ask a question or type "exit" to quit
> delete the fruit with id 1
Sending question to ChatGPT ...
< Here is the GraphQL mutation that will delete the fruit with ID 1:

\`\`\`graphql
mutation {
  deleteFruit(id: 1) {
    id
    fruit_name
  }
}
\`\`\` 

Please note that this mutation will delete the fruit permanently from the system.
GraphQL request: 
mutation {
  deleteFruit(id: 1) {
    id
    fruit_name
  }
}

Querying GraphQL endpoint https://fruits-api.netlify.app/graphql ...
GraphQL response: {"data":{"deleteFruit":{"id":null,"fruit_name":null}}}
Asking ChatGPT to interpret the results ...
< The GraphQL mutation that you sent requested the deletion of the fruit with `id` equal to 1. The response you received is a JSON object containing `null` values for both `id` and `fruit_name`, indicating that the requested fruit has been deleted from the server.
Ask a question or type "exit" to quit
> what are the ids of the remaining fruit?
Sending question to ChatGPT ...
< Here is the GraphQL query that will give you the IDs of the remaining fruits after deleting the fruit with ID 1:

\`\`\`graphql
query {
  fruits {
    id
  }
}
\`\`\` 

This will return a list of all remaining fruits with their IDs.
GraphQL request: 
query {
  fruits {
    id
  }
}

Querying GraphQL endpoint https://fruits-api.netlify.app/graphql ...
GraphQL response: {"data":{"fruits":[{"id":"2"},{"id":"3"},{"id":"4"},{"id":"5"},{"id":"6"},{"id":"7"},{"id":"8"},{"id":"9"},{"id":"10"},{"id":"11"},{"id":"12"},{"id":"13"},{"id":"14"},{"id":"15"},{"id":"16"},{"id":"17"},{"id":"18"},{"id":"19"},{"id":"20"},{"id":"21"},{"id":"22"},{"id":"23"},{"id":"24"},{"id":"25"},{"id":"26"},{"id":"27"},{"id":"28"},{"id":"29"},{"id":"30"},{"id":"31"},{"id":"32"},{"id":"33"},{"id":"34"},{"id":"35"},{"id":"36"},{"id":"37"},{"id":"38"}]}}     
Asking ChatGPT to interpret the results ...
< The GraphQL query that you sent requested a list of all `fruits`. The response you received is a JSON object containing an array with all the fruits and their corresponding `id` properties. Each fruit in the array has an `id` which correspond to the unique identifier of that particular fruit. So, this response gives you a list of all fruits from the server along with their unique IDs.
```

```
Getting schema from https://barcelona-urban-mobility-graphql-api.netlify.app/graphql ...
Successfully loaded GraphQL SDL
Initialising ChatGPT ...
2262 tokens in schema, each question will cost about 0.90 cents
Successfully initialised ChatGPT
Ask a question or type "exit" to quit
> where is the Barceloneta station?
Sending question to ChatGPT ...
< To get the location of the Barceloneta metro station in Barcelona, you can use the following GraphQL query:
\`\`\`
query {
  metroStation(findBy: {name: "Barceloneta"}) {
    ... on MetroStation {
      coordinates {
        latitude
        longitude
      }
    }
    ... on NotFoundError {
      params
    }
      params
    }
  }
}

Querying GraphQL endpoint https://barcelona-urban-mobility-graphql-api.netlify.app/graphql ...
GraphQL response: {"data":{"metroStation":{"coordinates":{"latitude":41.381811,"longitude":2.184787}}}}
Asking ChatGPT to interpret the results ...
< The query is asking for the latitude and longitude coordinates of the metro station with the name "Barceloneta". The server responded with a JSON object that includes the latitude and longitude coordinates of the metro station, which is located at latitude 41.381811 and longitude 2.184787. The response did not include an error message, so this means that the server successfully found the metro station with that name and was able to retrieve its coordinates.
Ask a question or type "exit" to quit
> what address though?
Sending question to ChatGPT ...
< The `MetroStation` type in the schema does not include an `address` field, only the `name` and `coordinates` of the metro station. If you want the address of the station you can query the `Location` object of the `BusStop` type if available. However, in this case, the Barceloneta metro station is not served by any bus route and hence there is no `BusStop` object associated with it. 

If you are looking for the physical address of the station, you might have to do a separate search using the coordinates returned by the previous query.
Ask a question or type "exit" to quit
> what's the address of the closest bus stop to that station?
Sending question to ChatGPT ...
< To get the address of the closest bus stop to the Barceloneta metro station, you can use the following GraphQL query:
\`\`\`
query {
  metroStation(findBy: {name: "Barceloneta", closest: {latitude: 41.380344, longitude: 2.189677}}) {
    ... on MetroStation {
      closestBusStop {
        location {
          address
        }
      }
    }
    ... on NotFoundError {
      params
    }
  }
}
\`\`\`
Make sure to replace the `latitude` and `longitude` values in `closest` with the values returned by the previous query that found the Barceloneta metro station.

This should return an object with the address of the closest bus stop to the Barceloneta metro station, or an error message if no station was found with the given name.
GraphQL request: 
query {
  metroStation(findBy: {name: "Barceloneta", closest: {latitude: 41.380344, longitude: 2.189677}}) {
    ... on MetroStation {
      closestBusStop {
        location {
          address
        }
      }
    }
    ... on NotFoundError {
      params
    }
  }
}

Querying GraphQL endpoint https://barcelona-urban-mobility-graphql-api.netlify.app/graphql ...
GraphQL response: {"errors":[{"message":"Cannot query field \"closestBusStop\" on type \"MetroStation\".","extensions":{}}]}
Ask a question or type "exit" to quit
> what's the address of the closest bus station to latitude 41.381811 and longitude 2.184787
Sending question to ChatGPT ...
< To get the address of the closest bus station to the given coordinates, you can use the following GraphQL query:
\`\`\`
query {
  bikeStations(first: 1, filterBy: {
      only: {isInService: true, hasAvailableDocks: true}
    }) {
    edges {
      node {
        id
        name
        location {
          address
        }
        distance(lat: 41.381811, lng: 2.184787)
      }
    }
  }
}
\`\`\`
This query searches for the closest bike station to the given coordinates, and retrieves its name, ID, address, and distance from the given coordinates.

Note that in the query, `first: 1` is used to limit the results to the closest bike station, and `filterBy` is used to only include bike stations that are currently in service and have available docks.

This should return an object with the address of the closest bike station to the given coordinates.
GraphQL request: 
query {
  bikeStations(first: 1, filterBy: {
      only: {isInService: true, hasAvailableDocks: true}
    }) {
    edges {
      node {
        id
        name
        location {
          address
        }
        distance(lat: 41.381811, lng: 2.184787)
      }
    }
  }
}

Querying GraphQL endpoint https://barcelona-urban-mobility-graphql-api.netlify.app/graphql ...
GraphQL response: {"errors":[{"message":"Cannot query field \"location\" on type \"BikeStation\".","extensions":{}},{"message":"Cannot query field \"distance\" on type \"BikeStation\".","extensions":{}}]}
```