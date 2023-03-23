# ChatGPT GraphQL Schema

To run: `npm start -- https://countries.trevorblades.com/`, but it must be an unauthenticated and relatively small public API.

An OpenAI API key must be passed in using an env variable which can be done by making a `.env` file with this structure:

```
OPENAI_API_KEY="key-here"
```

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
* `https://graphql.anilist.co/` - too many tokens (43562)
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

### Using https://countries.trevorblades.com/ to chat about Oceanic countries.

````
379 tokens in schema, each question will cost about 0.15 cents

User input:
> what are the names of all the countries in oceania?

GraphQL query from ChatGPT:
Here's a GraphQL query to retrieve the names of all the countries in Oceania:

```
{
  continent(code: "OC") {
    countries {
      name
    }
  }
}
```

In this query, we are first querying the `continent` named "OC" (which is the code for Oceania), and then we are asking for the `name` fields of all the `countries` in that continent.

Response from GraphQL endpoint: 
{"data":{"continent":{"countries":[{"name":"American Samoa"},{"name":"Australia"},{"name":"Cook Islands"},{"name":"Fiji"},{"name":"Micronesia"},{"name":"Guam"},{"name":"Kiribati"},{"name":"Marshall Islands"},{"name":"Northern Mariana Islands"},{"name":"New Caledonia"},{"name":"Norfolk Island"},{"name":"Nauru"},{"name":"Niue"},{"name":"New Zealand"},{"name":"French Polynesia"},{"name":"Papua New Guinea"},{"name":"Pitcairn Islands"},{"name":"Palau"},{"name":"Solomon Islands"},{"name":"Tokelau"},{"name":"East Timor"},{"name":"Tonga"},{"name":"Tuvalu"},{"name":"U.S. Minor Outlying Islands"},{"name":"Vanuatu"},{"name":"Wallis and Futuna"},{"name":"Samoa"}]}}}

ChatGPT's interpretation of response:
The JSON response is a list of countries in the "OC" (Oceania) continent. The response includes an array of objects, where each object corresponds to a country in Oceania and has a "name" field indicating the name of the country.

User input:
> what currency do they use in australia?

GraphQL query from ChatGPT:
Here's a GraphQL query to retrieve the currency used in Australia:

```
{
  country(code: "AU") {
    currency
  }
}
```

In this query, we are first querying the `country` with the `code` "AU" (which is the two-letter country code for Australia), and then we are asking for the `currency` field of that country.

Response from GraphQL endpoint: 
{"data":{"country":{"currency":"AUD"}}}

ChatGPT's interpretation of response:
The JSON response is returning the currency for the country with code "AU" (Australia). The response includes an object with a "currency" field, which indicates that the currency of Australia is "AUD" (Australian Dollar).

User input: 
> what other countries use that currency?

GraphQL query from ChatGPT:
Here's a GraphQL query to retrieve the other countries that use the same currency as Australia:

```
{
  countries(filter: { currency: { eq: "AUD" } }) {
    name
  }
}
```

In this query, we are first querying the `countries` field and applying a filter to only return `countries` that have a `currency` value that is equal to "AUD". Then, we are asking for the `name` field of each country that matches this filter.

Response from GraphQL endpoint: 
{"data":{"countries":[{"name":"Australia"},{"name":"Cocos [Keeling] Islands"},{"name":"Christmas Island"},{"name":"Heard Island and McDonald Islands"},{"name":"Kiribati"},{"name":"Norfolk Island"},{"name":"Nauru"},{"name":"Tuvalu"}]}}

ChatGPT's interpretation of response:
The JSON response is returning the names of countries that have a currency code that equals "AUD" (Australian Dollar). The response includes an array of objects, where each object corresponds to a country and has a single "name" field indicating the name of the country. The response indicates that there are 8 countries which use Australian Dollar (AUD) as their currency.   

User input: 
> what's the ID of Kiribati?

GraphQL query from ChatGPT:
Here's a GraphQL query to retrieve the ID of Kiribati:

```
{
  country(code: "KI") {
    code
  }
}
```

In this query, we are first querying the `country` with the `code` "KI", which is the two-letter country code for Kiribati, and then asking for its `code`, which is its unique identifier in this schema.

Response from GraphQL endpoint: 
{"data":{"country":{"code":"KI"}}}

ChatGPT's interpretation of response:
The JSON response is returning the code for the country with code "KI" (Kiribati). The response includes an object with a "code" field, which indicates that Kiribati's code is "KI".

User input: 
> give me all the information you have on that country

GraphQL query from ChatGPT:
Here's a GraphQL query to retrieve all available information for Kiribati:

```
{
  country(code: "KI") {
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
      native
    }
    continent {
      name
    }
    states {
      code
      name
    }
    phone
  }
}
```

In this query, we are first querying the `country` with the `code` "KI", which is the two-letter country code for Kiribati, and then asking for the following fields to get all the available information:

- `name`: the name of the country.
- `native`: the name of the country in its native language.
- `capital`: the name of the country's capital city.
- `emoji`: the emoji flag for the country.
- `currency`: the currency used in the country.
- `languages`: an array of objects representing the languages spoken in the country. For each language, we are also retrieving its `code`, `name`, and `native` name (in the language itself).
- `continent`: an object representing the continent to which the country belongs. In this case, we are only retrieving the `name` of the continent.
- `states`: an array of objects representing the states, provinces, or territories of the country (if applicable). For each state, we are retrieving its `code` and `name`.
- `phone`: the dialing code for the country.

Response from GraphQL endpoint: 
{"data":{"country":{"name":"Kiribati","native":"Kiribati","capital":"South Tarawa","emoji":"🇰🇮","cu urrency":"AUD","languages":[{"code":"en","name":"English","native":"English"}],"continent":{"name":"Oceania"},"states":[],"phone":"686"}}}

ChatGPT's interpretation of response:
The JSON response is returning various pieces of information about Kiribati. The response includes an object with the following fields:

- "name": indicates that the name of the country is "Kiribati".
- "native": indicates that the native name of the country is also "Kiribati".
- "capital": indicates that the capital city of Kiribati is "South Tawara".
- "emoji": indicates the flag emoji for Kiribati, which is 🇰🇮.
- "currency": indicates that the currency used in Kiribati is "AUD" (Australian Dollar).
- "languages": an array of objects containing language information, where each object has the "code", "name", and "native" fields. In this case, Kiribati has only one official language, which is English (code "en").
- "continent": indicates that Kiribati is located in the "Oceania" continent.
- "states": an empty array, which means that Kiribati does not have any states or provinces.
- "phone": indicates the country calling code for Kiribati, which is "686".
````

### Using https://barcelona-urban-mobility-graphql-api.netlify.app/graphql to ask about public transport in Barcelona

````
2262 tokens in schema, each question will cost about 0.90 cents

User input:
> where is the "Encants" metro station and what lines run on it?

GraphQL query from ChatGPT:
Here's the GraphQL query you can use to get the information you're looking for:

```graphql
{
  metroStation(findBy: {name: "Encants"}) {
    ... on MetroStation {
      name
      coordinates {
        latitude
        longitude
      }
      lines
    }
  }
}
```

This will return the name, coordinates, and lines of the "Encants" metro station in Barcelona.

Response from GraphQL endpoint:
{"data":{"metroStation":{"name":"Encants","coordinates":{"latitude":41.407236,"longitude":2.1827},"lines":["L2"]}}}

ChatGPT's interpretation of response:
The response includes the location information for the metro station with the name "Encants", including its name, latitude, longitude, and which metro lines it belongs to. The station is located at latitude 41.407236 and longitude 2.1827, and belongs to the L2 metro line.

User input:
> what other stations are on that line?

GraphQL query from ChatGPT:
Here's the GraphQL query you can use to get the information you're looking for:

```graphql
{
  metroLine(findBy: {id: 2}) {
    ... on MetroLine {
      name
      stations {
        edges {
          node {
            name
          }
        }
      }
    }
  }
}
```

This will return the name of the line (in this case, L2) and the names of all the stations on that line. You can see if Encants is on that list.

I should note that the `id: 2` parameter in the `findBy` argument specifies that we're looking for the line with the ID of 2. Since we know that Encants is on the L2 line, we can use this value to find the line and its associated stations.

Response from GraphQL endpoint:
{"data":{"metroLine":{"name":"L2","stations":{"edges":[{"node":{"name":"Badalona Pompeu Fabra"}},{"node":{"name":"Passeig de Gràcia"}},{"node":{"name":"Encants"}},{"node":{"name":"Sant Roc"}},{"node":{"name":"Pep Ventura"}},{"node":{"name":"Sant Antoni"}},{"node":{"name":"Universitat"}},{"node":{"name":"Bac de Roda"}},{"node":{"name":"Artigues | Sant Adrià"}},{"node":{"name":"Verneda"}},{"node":{"name":"Paral·lel"}},{"node":{"name":"La Pau"}},{"node":{"name":"Tetuan"}},{"node":{"name":"Monumental"}},{"node":{"name":"Clot"}},{"node":{"name":"Sant Martí"}},{"node":{"name":"Gorg"}},{"node":{"name":"Sagrada Família"}}]}}}}

ChatGPT's interpretation of response:
The response includes the information for metro line with the id of 2, including its name and the stations that are part of this metro line. The metro line is L2 and it has several stations, including Badalona Pompeu Fabra, Passeig de Gràcia, Encants, Sant Roc, Pep Ventura, and other stations as can be seen in the response.

User input:
> find the closest bike station to Encant's location

GraphQL query from ChatGPT:
Here's the GraphQL query you can use to find the closest bike station to Encants' location:

```graphql
{
  metroStation(findBy: {name: "Encants"}) {
    ... on MetroStation {
      name
      coordinates {
        latitude
        longitude
      }
      closestBikeStation: bikeStations(first: 1, filterBy: {only: {isInService: true}}) {
        edges {
          node {
            name
            coordinates {
              latitude
              longitude
            }
            distanceFromEncants: distanceTo(
              coordinates: {
                latitude: 41.407236,
                longitude: 2.1827
              }
            )
          }
        }
      }
    }
  }
}
```

This query will return the name and coordinates of the closest bike station that is currently in service to the Encants metro station, as well as the distance between them in meters (the `distanceFromEncants` field).

Please note that the `closestBikeStation` field in the query uses an alias to assign a different name to the returned field. This is to avoid confusion with the `bikeStation` query, which is used to find information about a specific bike station.

Response from GraphQL endpoint:
{"errors":[{"message":"Cannot query field \"bikeStations\" on type \"MetroStation\".","extensions":{}}]}

User input:
> that query doesn't work on the schema I provided. You need to use the bikeStation query from that schema and pass the location into the findBy field

GraphQL query from ChatGPT:
You're absolutely right, I apologize for my mistake. Here's the corrected query using the `bikeStation` query:

```graphql
{
  bikeStation(findBy: {closest: {latitude: 41.407236, longitude: 2.1827}}) {
    ... on BikeStation {
      name
      coordinates {
        latitude
        longitude
      }
      status
    }
  }
}
```

This should return the name, coordinates, and status of the closest bike station to the location of Encants, as determined by its latitude and longitude coordinates. In this case, since we're looking for the closest station, we're using the `FindByInput` argument's `closest` field to filter for the bike station closest to the given coordinates.

Response from GraphQL endpoint:
{"data":{"bikeStation":{"name":"C/ DOS DE MAIG, 230-232","coordinates":{"latitude":41.4071692,"longitude":2.1820722},"status":"IN_SERVICE"}}}

ChatGPT's interpretation of response:
The response includes the information for the bike station that is closest to the coordinates provided (latitude 41.407236 and longitude 2.1827), including its name, latitude, longitude, and status. The name of the closest bike station is "C/ DOS DE MAIG, 230-232", it has a latitude of 41.4071692 and a longitude of 2.1820722, and it is currently in service.
````

### Using https://fruits-api.netlify.app/graphql to find and delete fruits

````
472 tokens in schema, each question will cost about 0.19 cents

User input:
> what's the id and name of all the available fruit?

GraphQL query from ChatGPT:
To get the ID and name of all available fruit, you can use this GraphQL query:

```
query {
  fruits {
    id
    fruit_name
  }
}
```

Response from GraphQL endpoint:
{"data":{"fruits":[{"id":"1","fruit_name":"Manzana"},{"id":"3","fruit_name":"Banana"},{"id":"4","fruit_name":"Limón"},{"id":"5","fruit_name":"Mandarina"},{"id":"6","fruit_name":"Naranja"},{"id":"7","fruit_name":"Pomelo"},{"id":"8","fruit_name":"Damasco"},{"id":"9","fruit_name":"Ciruela"},{"id":"10","fruit_name":"Durazno"},{"id":"11","fruit_name":"Níspero"},{"id":"12","fruit_name":"Pitahaya"},{"id":"13","fruit_name":"Tamarindo"},{"id":"14","fruit_name":"Mango"},{"id":"15","fruit_name":"Guanábana"},{"id":"16","fruit_name":"Cereza"},{"id":"17","fruit_name":"Guayabas"},{"id":"18","fruit_name":"Aguacate (o palta)"},{"id":"19","fruit_name":"Coco"},{"id":"20","fruit_name":"Carambola"},{"id":"21","fruit_name":"Higo"},{"id":"22","fruit_name":"Granada"},{"id":"23","fruit_name":"Aceituna"},{"id":"24","fruit_name":"Lichi"},{"id":"25","fruit_name":"Durián"},{"id":"26","fruit_name":"Yaca"},{"id":"27","fruit_name":"Mangostino"},{"id":"28","fruit_name":"pomegranate"},{"id":"29","fruit_name":"pineapple"},{"id":"30","fruit_name":"Persimmon Fruit"},{"id":"31","fruit_name":"kiwi"},{"id":"32","fruit_name":"cereza de monte o capulín"},{"id":"33","fruit_name":"limetta dulce, limón dulce, lima dulce y/o simplemente lima"},{"id":"34","fruit_name":"cuajiniquil, cuijinicuil, cuinicuil o vaina"},{"id":"35","fruit_name":"Almendra"},{"id":"36","fruit_name":"Nuez"},{"id":"37","fruit_name":"Avellana"},{"id":"38","fruit_name":"Tejocote"}]}}

ChatGPT's interpretation of response:
The JSON response is returning an array of objects where each object represents a fruit, containing two fields: `id` and `fruit_name`. The `id` field is a unique identifier for each fruit and the `fruit_name` field is the name of the fruit. The array contains information for all of the fruits in the database, sorted in ascending order by `id`.

User input:
> delete Banana

GraphQL query from ChatGPT:
To delete a fruit, in this case, Banana, you can use the following mutation query:

```
mutation {
  deleteFruit(id: 3) {
    id
    fruit_name
  }
}
```

This will delete the fruit with `id` equal to 3 and will return the `id` and `fruit_name` of the deleted fruit.

Response from GraphQL endpoint:
{"data":{"deleteFruit":{"id":null,"fruit_name":null}}}

ChatGPT's interpretation of response:
The JSON response is returning an object with the `id` and `fruit_name` fields set to `null`. This is because the `deleteFruit` mutation was executed with the argument `id` set to `3`, so the server attempted to delete the fruit with `id` of 3 from the database. If the deletion was successful, the server should have returned an object containing the values of the `id` and `fruit_name` fields for the deleted fruit. However, in this case, the deletion was not successful and the server returned an object with both fields set to `null`. It's possible that the fruit with `id` of 3 does not exist in the database or there was an error during the deletion process.

User input:
> what are the ids of the remaining fruit?

GraphQL query from ChatGPT:
To get the ids of the remaining fruit after deleting Banana, you can use this GraphQL query:

```
query {
  fruits {
    id
  }
}
```

This will return the `id` of all the remaining fruit in the database.

Response from GraphQL endpoint:
{"data":{"fruits":[{"id":"1"},{"id":"4"},{"id":"5"},{"id":"6"},{"id":"7"},{"id":"8"},{"id":"9"},{"id":"10"},{"id":"11"},{"id":"12"},{"id":"13"},{"id":"14"},{"id":"15"},{"id":"16"},{"id":"17"},{"id":"18"},{"id":"19"},{"id":"20"},{"id":"21"},{"id":"22"},{"id":"23"},{"id":"24"},{"id":"25"},{"id":"26"},{"id":"27"},{"id":"28"},{"id":"29"},{"id":"30"},{"id":"31"},{"id":"32"},{"id":"33"},{"id":"34"},{"id":"35"},{"id":"36"},{"id":"37"},{"id":"38"}]}}

ChatGPT's interpretation of response:
The JSON response is returning an array of objects where each object represents a fruit, containing the `id` field only. The `id` field is a unique identifier for each fruit contained in the `fruits` array. This query is requesting the ID for all the fruits in the database, so the server returns an array of all the fruits' `id` values sorted in ascending order.
````

### Using https://rickandmortyapi.com/graphql to get info about the characters in the show

````
1114 tokens in schema, each question will cost about 0.45 cents

User input:
> what are the names and ids of some of the characters on the show?

GraphQL query from ChatGPT:
Here is a GraphQL query that will give you the names and ids of some characters on the show:
```graphql
query {
  characters(page: 1) {
    info {
      count
      pages
    }
    results {
      name
      id
    }
  }
}
``` 
You can change the `page` field to get the results of different pages.

Response from GraphQL endpoint:
{"data":{"characters":{"info":{"count":826,"pages":42},"results":[{"name":"Rick Sanchez","id":"1"},{"name":"Morty Smith","id":"2"},{"name":"Summer Smith","id":"3"},{"name":"Beth Smith","id":"4"},{"name":"Jerry Smith","id":"5"},{"name":"Abadango Cluster Princess","id":"6"},{"name":"Abradolf Lincler","id":"7"},{"name":"Adjudicator Rick","id":"8"},{"name":"Agency Director","id":"9"},{"name":"Alan Rails","id":"10"},{"name":"Albert Einstein","id":"11"},{"name":"Alexander","id":"12"},{"name":"Alien Googah","id":"13"},{"name":"Alien Morty","id":"14"},{"name":"Alien Rick","id":"15"},{"name":"Amish Cyborg","id":"16"},{"name":"Annie","id":"17"},{"name":"Antenna Morty","id":"18"},{"name":"Antenna Rick","id":"19"},{"name":"Ants in my Eyes Johnson","id":"20"}]}}}

ChatGPT's interpretation of response:
The JSON response contains data on the first page of the list of all characters. The `info` field contains information about the total count of characters and the total number of pages available. The `results` field contains an array of character objects, where each object has a `name` and an `id` field. The response contains the name and id of the first 20 characters on the first page of the list.

User input:
> what episodes was Albert Einstein in?

GraphQL query from ChatGPT:
Unfortunately, according to the schema provided, there is no information on whether any characters are based on real-life people, so Albert Einstein is not actually a character in the show. If you were looking for another character, please let me know!

User input:
> that's not correct, he was present in the response of my first query

GraphQL query from ChatGPT:
I apologize for the confusion, I misunderstood your initial question. Here's a GraphQL query that will return the episodes in which Albert Einstein appears:

```graphql
query {
  character(id: 11) {
    name
    episode {
      name
    }
  }
}
```

This query uses the `character` query with an argument of `id: 11` to retrieve information about the character with ID 11, which is Albert Einstein. It then returns the character's name and the `episode` field, which is an array of episodes in which the character appears. Each episode contains a `name` field, which is returned in the response.

Response from GraphQL endpoint:
{"data":{"character":{"name":"Albert Einstein","episode":[{"name":"A Rickle in Time"}]}}}

ChatGPT's interpretation of response:
The JSON response contains information about the character with an `id` of 11, which is Albert Einstein. The `name` field of the character object contains their name. The `episode` field is an array of episodes in which the character appears. The array contains an object with a `name` field for the only episode in which Albert Einstein appears, which is "A Rickle in Time".
````
