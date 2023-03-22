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

### Countries API

<details>
PS D:\src\chatgpt-graphql-schema> npm start -- https://countries.trevorblades.com/

> chatgpt-graphql-schema@1.0.0 start
> node index.js https://countries.trevorblades.com/

! 379 tokens in schema, each question will cost about 0.15 cents
Ask a question or type "exit" to quit
> what are the names of all the countries in oceania?
< Here's the query to get the names of all countries in Oceania:
```graphql
query {
  continent(code: "OC") {
    countries {
      name
    }
  }
}
``` 
Note that this assumes that Oceania has been assigned the code "OC" in the system. If not, replace "OC" with the correct 
code for Oceania.
! Response from GraphQL endpoint: {"data":{"continent":{"countries":[{"name":"American Samoa"},{"name":"Australia"},{"name":"Cook Islands"},{"name":"Fiji"},{"name":"Micronesia"},{"name":"Guam"},{"name":"Kiribati"},{"name":"Marshall Islands"},{"name":"Northern Mariana Islands"},{"name":"New Caledonia"},{"name":"Norfolk Island"},{"name":"Nauru"},{"name":"Niue"},{"name":"New Zealand"},{"name":"French Polynesia"},{"name":"Papua New Guinea"},{"name":"Pitcairn Islands"},{"name":"Palau"},{"name":"Solomon Islands"},{"name":"Tokelau"},{"name":"East Timor"},{"name":"Tonga"},{"name":"Tuvalu"},{"name":"U.S. Minor Outlying Islands"},{"name":"Vanuatu"},{"name":"Wallis and Futuna"},{"name":"Samoa"}]}}}
< This query is asking the server to return the names of all countries that belong to the continent with the code "OC". 
The server has responded with a list of all countries belonging to the Oceanic continent, along with their names, in 
alphabetical order. The names of the countries are enclosed in curly brackets and separated by commas.
Ask a question or type "exit" to quit
> what currency do they use in australia?
< Here's the query to get the currency used in Australia:
```graphql
query {
  country(code: "AU") {
    currency
  }
}
```
Note that this assumes that Australia has been assigned the code "AU" in the system. If not, replace "AU" with the 
correct code for Australia.
! Response from GraphQL endpoint: {"data":{"country":{"currency":"AUD"}}}
< This query is asking the server to return the currency used in the country with the code "AU". The server has 
responded with a JSON object that contains one field, "currency", with the value of "AUD". This means that the currency 
of Australia is the Australian Dollar (AUD).
Ask a question or type "exit" to quit
> what other countries use that currency?
< Here's the query to get the names of all the countries that use the same currency as Australia:
```graphql
query {
  countries(filter: {currency: {eq: "AUD"}}) {
    name
  }
}
``` 
Note that this assumes that the currency used in Australia is AUD. If not, replace "AUD" with the appropriate currency 
code.
! Response from GraphQL endpoint: {"data":{"countries":[{"name":"Australia"},{"name":"Cocos [Keeling] Islands"},{"name":"Christmas Island"},{"name":"Heard Island and McDonald Islands"},{"name":"Kiribati"},{"name":"Norfolk Island"},{"name":"Nauru"},{"name":"Tuvalu"}]}}
< This query is asking the server to return the names of all countries whose currency is "AUD". The server has responded 
with a list of all such countries along with their names, enclosed in curly brackets and separated by commas. The names 
of the countries are listed in alphabetical order. This means that there are eight countries which use the Australian 
Dollar (AUD) as their currency: Australia, Cocos [Keeling] Islands, Christmas Island, Heard Island and McDonald Islands, 
Kiribati, Norfolk Island, Nauru, and Tuvalu.
Ask a question or type "exit" to quit
> exit
</details>

### Barcelona public transport API

````
PS D:\src\chatgpt-graphql-schema> npm start -- https://barcelona-urban-mobility-graphql-api.netlify.app/graphql

> chatgpt-graphql-schema@1.0.0 start
> node index.js https://barcelona-urban-mobility-graphql-api.netlify.app/graphql

! 2262 tokens in schema, each question will cost about 0.90 cents
Ask a question or type "exit" to quit
> where is the Florida metro station and what lines are on it?
< Here's a query that should give you the information you need:

```
{
  metroStation(findBy: { name: "Florida" }) {
    ... on MetroStation {
      name
      coordinates {
        latitude
        longitude
      }
      lines
    }
    ... on NotFoundError {
      params
    }
  }
}
```

This will return the name and coordinates of the Florida metro station, as well as the lines that run through it. If the
 station is not found, it will return the search parameters that resulted in a not found error.
! Response from GraphQL endpoint: {"data":{"metroStation":{"name":"Florida","coordinates":{"latitude":41.368316,"longitude":2.110027},"lines":["L1"]}}}
< The query is searching for a metro station with the name "Florida". The response contains a JSON object with a "data" 
field. Inside that field, there is a "metroStation" field, which contains information about the station that was found. 
The station's name is "Florida", and it is located at latitude 41.368316 and longitude 2.110027. It also belongs to the 
line L1. There is no "params" field, which means that the query was successful and no errors were returned.
Ask a question or type "exit" to quit
> what other stations are on line L1
< Here's a query that should give you the information you need:

```
{
  metroLine(findBy: { name: "L1" }) {
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
    ... on NotFoundError {
      params
    }
  }
}
```

This will return a list of all the metro stations on line L1, if the line is found. If the line is not found, it will 
return the search parameters that resulted in a not found error.
! Response from GraphQL endpoint: {"data":{"metroLine":{"name":"L1","stations":{"edges":[{"node":{"name":"Bellvitge"}},{"node":{"name":"Florida"}},{"node":{"name":"Santa Eulàlia"}},{"node":{"name":"Urgell"}},{"node":{"name":"Espanya"}},{"node":{"name":"Urquinaona"}},{"node":{"name":"Glòries"}},{"node":{"name":"Fabra i Puig"}},{"node":{"name":"Clot"}},{"node":{"name":"Santa Coloma"}},{"node":{"name":"Hospital de Bellvitge"}},{"node":{"name":"Rambla Just Oliveras"}},{"node":{"name":"Torrassa"}},{"node":{"name":"Universitat"}},{"node":{"name":"Marina"}},{"node":{"name":"La Sagrera"}},{"node":{"name":"Baró de Viver"}},{"node":{"name":"Plaça de Sants"}},{"node":{"name":"Mercat Nou"}},{"node":{"name":"Fondo"}},{"node":{"name":"Av. Carrilet"}},{"node":{"name":"Trinitat Vella"}},{"node":{"name":"Sant Andreu"}},{"node":{"name":"Navas"}},{"node":{"name":"Catalunya"}},{"node":{"name":"Can Serra"}},{"node":{"name":"Rocafort"}},{"node":{"name":"Arc de Triomf"}},{"node":{"name":"Torras i Bages"}},{"node":{"name":"Hostafrancs"}}]}}}}
< The query is searching for a metro line with the name "L1". The response contains a JSON object with a "data" field. 
Inside that field, there is a "metroLine" field, which contains information about the line that was found. The line's 
name is "L1". There is also a "stations" field, which contains information about the stations that belong to this line. 
The "stations" field contains a "edges" field, which contains a list of station information. Each entry inside that list 
contains the "node" field which will contain the information about a single station. For example, the first station 
found named "Bellvitge" can be seen inside the "nodes" field. There is no "params" field, which means that the query was 
successful and no errors were returned.
Ask a question or type "exit" to quit
> what's the closest bike station to latitude 41.368316 and longitude 2.110027?
< Here's a query that should give you the information you need:

```
{
  bikeStations(first: 1, filterBy: { only: { isInService: true, hasAvailableBikes: true } }, orderBy: {field: DISTANCE, latitude: 41.368316, longitude: 2.110027}) {
    edges {
      node {
        name
        coordinates {
          latitude
          longitude
        }
        available {
          bikes {
            electrical
            mechanical
          }
        }
        distance
      }
    }
  }
}

```

This will return the closest bike station to the latitude and longitude provided with at least one available bike and
 which is currently in service. The `distance` field in the result will indicate the distance in meters from the 
 specified coordinates to the bike station.
! Response from GraphQL endpoint: {"errors":[{"message":"Unknown argument \"orderBy\" on field \"RootQuery.bikeStations\".","extensions":{}},{"message":"Cannot query field \"distance\" on type \"BikeStation\".","extensions":{}}]}
Ask a question or type "exit" to quit
> that query doesn't work on the schema I provided. You need to use the bikeStation query from that schema.
< You are right. Sorry for the confusion. Here is the query that should work with the schema provided:

```
{
  bikeStation(findBy: { closest: { latitude: 41.368316, longitude: 2.110027 } }, filterBy: { only: { isInService: true, hasAvailableBikes: true } }) {
    ... on BikeStation {
      name
      coordinates {
        latitude
        longitude
      }
      available {
        bikes {
          electrical
          mechanical
        }
      }
    }
    ... on NotFoundError {
      params
    }
  }
}
```

This will return the closest bike station to the provided latitude and longitude with at least one available bike and 
which is currently in service. If the station is not found, it will return the search parameters that resulted in a not
 found error.
! Response from GraphQL endpoint: {"errors":[{"message":"Unknown argument \"filterBy\" on field \"RootQuery.bikeStation\". Did you mean \"findBy\"?","extensions":{}}]}
Ask a question or type "exit" to quit
> that still doesn't work, you need to remove the filterBy parameter
< I apologize for the mistakes in my previous responses. Thank you for bringing it to my attention. Here's the correct 
query to find the closest bike station to the given coordinates:

```
{
  bikeStation(findBy: { closest: { latitude: 41.368316, longitude: 2.110027 } }) {
    ... on BikeStation {
      name
      coordinates {
        latitude
        longitude
      }
      available {
        bikes {
          electrical
          mechanical
        }
      }
    }
    ... on NotFoundError {
      params
    }
  }
}
```

This query will return the bike station that is closest to the provided coordinates. If there are multiple bike stations 
at the same distance, it will return the first one found. If the station is not found, it will return the search 
parameters that resulted in a not found error.
! Response from GraphQL endpoint: {"data":{"bikeStation":{"name":"C/ CARDENAL REIG, 11","coordinates":{"latitude":41.37684,"longitude":2.114029},"available":{"bikes":{"electrical":9,"mechanical":0}}}}}
< The query is searching for a bike station closest to the location with a latitude of 41.368316 and longitude of 
2.110027. The response contains a JSON object with a "data" field. Inside that field, there is a "bikeStation" field, 
which contains information about the bike station that was found. The station's name is "C/ CARDENAL REIG, 11", and it 
is located at latitude 41.37684 and longitude 2.114029. There is also an "available" field, which contains information 
about the bikes available at this station. Within "available" there is a "bikes" field that shows the count of both 
electrical and mechanical bikes available at the station. In this case, there are 9 electrical bikes and 0 mechanical 
bikes available. There is no "params" field, which means that the query was successful and no errors were returned.
Ask a question or type "exit" to quit
> exit
````

### Fruits API

````
PS D:\src\chatgpt-graphql-schema> npm start -- https://fruits-api.netlify.app/graphql

> chatgpt-graphql-schema@1.0.0 start
> node index.js https://fruits-api.netlify.app/graphql

! 472 tokens in schema, each question will cost about 0.19 cents
Ask a question or type "exit" to quit
> what's the id and name of all the available fruit?
< ```
query {
  fruits {
    id
    fruit_name
  }
}
```
! Response from GraphQL endpoint: {"data":{"fruits":[{"id":"2","fruit_name":"Pera"},{"id":"3","fruit_name":"Banana"},{"id":"4","fruit_name":"Limón"},{"id":"5","fruit_name":"Mandarina"},{"id":"6","fruit_name":"Naranja"},{"id":"7","fruit_name":"Pomelo"},{"id":"8","fruit_name":"Damasco"},{"id":"9","fruit_name":"Ciruela"},{"id":"10","fruit_name":"Durazno"},{"id":"11","fruit_name":"Níspero"},{"id":"12","fruit_name":"Pitahaya"},{"id":"13","fruit_name":"Tamarindo"},{"id":"14","fruit_name":"Mango"},{"id":"15","fruit_name":"Guanábana"},{"id":"16","fruit_name":"Cereza"},{"id":"17","fruit_name":"Guayabas"},{"id":"18","fruit_name":"Aguacate (o palta)"},{"id":"19","fruit_name":"Coco"},{"id":"20","fruit_name":"Carambola"},{"id":"21","fruit_name":"Higo"},{"id":"22","fruit_name":"Granada"},{"id":"23","fruit_name":"Aceituna"},{"id":"24","fruit_name":"Lichi"},{"id":"25","fruit_name":"Durián"},{"id":"26","fruit_name":"Yaca"},{"id":"27","fruit_name":"Mangostino"},{"id":"28","fruit_name":"pomegranate"},{"id":"29","fruit_name":"pineapple"},{"id":"30","fruit_name":"Persimmon Fruit"},{"id":"31","fruit_name":"kiwi"},{"id":"32","fruit_name":"cereza de monte o capulín"},{"id":"33","fruit_name":"limetta dulce, limón dulce, lima dulce y/o simplemente lima"},{"id":"34","fruit_name":"cuajiniquil, cuijinicuil, cuinicuil o vaina"},{"id":"35","fruit_name":"Almendra"},{"id":"36","fruit_name":"Nuez"},{"id":"37","fruit_name":"Avellana"},{"id":"38","fruit_name":"Tejocote"},{"id":"9680","fruit_name":"Hafiz juice corner"}]}}
< The GraphQL query asked for all the fruits and their IDs and names. The response from the server is a list of fruits 
containing their IDs and names. The list includes fruits like 'Pera', 'Banana', 'Limón', etc.
Ask a question or type "exit" to quit
> delete the fruit with ID 3
< ```
mutation {
  deleteFruit(id: 3) {
    id
    fruit_name
  }
}
```
! Response from GraphQL endpoint: {"data":{"deleteFruit":{"id":null,"fruit_name":null}}}
< The GraphQL mutation requested the server to delete a fruit with the ID of 3. The response from the server is an 
object containing null values for the `id` and `fruit_name` fields, which means that no fruit was found with the 
specified ID to delete.
Ask a question or type "exit" to quit
> what are the ids of the remaining fruit?
< I can provide this information only after the execution of the previous mutation. When you run the previous mutation, 
it will delete the fruit with ID=3 and return the deleted fruit with its ID and name. 

To get the IDs of the remaining fruits, you can run the following query without including the fruit with ID=3:

```
query {
  fruits {
    id
    fruit_name
  }
}
``` 

Then, use this query to get the information about the remaining fruits.
! Response from GraphQL endpoint: {"data":{"fruits":[{"id":"2","fruit_name":"Pera"},{"id":"4","fruit_name":"Limón"},{"id":"5","fruit_name":"Mandarina"},{"id":"6","fruit_name":"Naranja"},{"id":"7","fruit_name":"Pomelo"},{"id":"8","fruit_name":"Damasco"},{"id":"9","fruit_name":"Ciruela"},{"id":"10","fruit_name":"Durazno"},{"id":"11","fruit_name":"Níspero"},{"id":"12","fruit_name":"Pitahaya"},{"id":"13","fruit_name":"Tamarindo"},{"id":"14","fruit_name":"Mango"},{"id":"15","fruit_name":"Guanábana"},{"id":"16","fruit_name":"Cereza"},{"id":"17","fruit_name":"Guayabas"},{"id":"18","fruit_name":"Aguacate (o palta)"},{"id":"19","fruit_name":"Coco"},{"id":"20","fruit_name":"Carambola"},{"id":"21","fruit_name":"Higo"},{"id":"22","fruit_name":"Granada"},{"id":"23","fruit_name":"Aceituna"},{"id":"24","fruit_name":"Lichi"},{"id":"25","fruit_name":"Durián"},{"id":"26","fruit_name":"Yaca"},{"id":"27","fruit_name":"Mangostino"},{"id":"28","fruit_name":"pomegranate"},{"id":"29","fruit_name":"pineapple"},{"id":"30","fruit_name":"Persimmon Fruit"},{"id":"31","fruit_name":"kiwi"},{"id":"32","fruit_name":"cereza de monte o capulín"},{"id":"33","fruit_name":"limetta dulce, limón dulce, lima dulce y/o simplemente lima"},{"id":"34","fruit_name":"cuajiniquil, cuijinicuil, cuinicuil o vaina"},{"id":"35","fruit_name":"Almendra"},{"id":"36","fruit_name":"Nuez"},{"id":"37","fruit_name":"Avellana"},{"id":"38","fruit_name":"Tejocote"},{"id":"9680","fruit_name":"Hafiz juice corner"}]}}
< The GraphQL query asked for all the fruits and their IDs and names. The response from the server is a list of fruits 
containing their IDs and names. However, the fruit with ID 3 (Banana) is not present in the list. So, it seems that the 
mutation that was sent earlier to delete the fruit with ID 3 was successful. The list includes fruits like 'Pera', 
'Limón', 'Mandarina', etc.
Ask a question or type "exit" to quit
````

### Rick and Morty

````
PS D:\src\chatgpt-graphql-schema> npm start -- https://rickandmortyapi.com/graphql

> chatgpt-graphql-schema@1.0.0 start
> node index.js https://rickandmortyapi.com/graphql

! 1114 tokens in schema, each question will cost about 0.45 cents
Ask a question or type "exit" to quit
> what are some of the characters on the show?
< Here's a GraphQL query to get the names of the first 20 characters:
```graphql
query {
  characters(page: 1) {
    results {
      name
    }
  }
}
```
! Response from GraphQL endpoint: {"data":{"characters":{"results":[{"name":"Rick Sanchez"},{"name":"Morty Smith"},{"name":"Summer Smith"},{"name":"Beth Smith"},{"name":"Jerry Smith"},{"name":"Abadango Cluster Princess"},{"name":"Abradolf Lincler"},{"name":"Adjudicator Rick"},{"name":"Agency Director"},{"name":"Alan Rails"},{"name":"Albert Einstein"},{"name":"Alexander"},{"name":"Alien Googah"},{"name":"Alien Morty"},{"name":"Alien Rick"},{"name":"Amish Cyborg"},{"name":"Annie"},{"name":"Antenna Morty"},{"name":"Antenna Rick"},{"name":"Ants in my Eyes Johnson"}]}}}
< The GraphQL query requested a list of characters, specifically their names, and asked for the first page of results. 
The server responded with a JSON object that contains an array of character objects, each with a "name" field. The array 
contains 20 character objects, which correspond to the 20 characters on the first page of the character list.
Ask a question or type "exit" to quit
> what are the IDs of those characters?
< Here's a GraphQL query to get the names and IDs of the first 20 characters:
```graphql
query {
  characters(page: 1) {
    results {
      id
      name
    }
  }
}
```
! Response from GraphQL endpoint: {"data":{"characters":{"results":[{"id":"1","name":"Rick Sanchez"},{"id":"2","name":"Morty Smith"},{"id":"3","name":"Summer Smith"},{"id":"4","name":"Beth Smith"},{"id":"5","name":"Jerry Smith"},{"id":"6","name":"Abadango Cluster Princess"},{"id":"7","name":"Abradolf Lincler"},{"id":"8","name":"Adjudicator Rick"},{"id":"9","name":"Agency Director"},{"id":"10","name":"Alan Rails"},{"id":"11","name":"Albert Einstein"},{"id":"12","name":"Alexander"},{"id":"13","name":"Alien Googah"},{"id":"14","name":"Alien Morty"},{"id":"15","name":"Alien Rick"},{"id":"16","name":"Amish Cyborg"},{"id":"17","name":"Annie"},{"id":"18","name":"Antenna Morty"},{"id":"19","name":"Antenna Rick"},{"id":"20","name":"Ants in my Eyes Johnson"}]}}}
< The GraphQL query requested a list of characters, specifically their IDs and names, and asked for the first page of
results. The server responded with a JSON object that contains an array of character objects, each with an "id" field 
and a "name" field. The array contains 20 character objects, which correspond to the 20 characters on the first page of 
the character list. The "id" field is a unique identifier for each character in the database.
Ask a question or type "exit" to quit
> what are some of the episodes that albert einstein was in (ID 11)?
< Unfortunately, the show Rick and Morty does not contain any character named Albert Einstein, so there are no episodes 
in which he appeared.
Ask a question or type "exit" to quit
> he is a character on the show, here's the response I got from that earlier query: {"data":{"characters":{"results":[{"id":"1","name":"Rick Sanchez"},{"id":"2","name":"Morty Smith"},{"id":"3","name":"Summer Smith"},{"id":"4","name":"Beth Smith"},{"id":"5","name":"Jerry Smith"},{"id":"6","name":"Abadango Cluster Princess"},{"id":"7","name":"Abradolf Lincler"},{"id":"8","name":"Adjudicator Rick"},{"id":"9","name":"Agency Director"},{"id":"10","name":"Alan Rails"},{"id":"11","name":"Albert Einstein"},{"id":"12","name":"Alexander"},{"id":"13","name":"Alien Googah"},{"id":"14","name":"Alien Morty"},{"id":"15","name":"Alien Rick"},{"id":"16","name":"Amish Cyborg"},{"id":"17","name":"Annie"},{"id":"18","name":"Antenna Morty"},{"id":"19","name":"Antenna Rick"},{"id":"20","name":"Ants in my Eyes Johnson"}]}}}
< I apologize for the confusion earlier. Here's a GraphQL query to get the list of episodes in which the character with 
ID 11 (Albert Einstein) appeared:
```graphql
query {
  character(id: 11) {
    episode {
      id
      name
    }
  }
}
```
! Response from GraphQL endpoint: {"data":{"character":{"episode":[{"id":"12","name":"A Rickle in Time"}]}}}
< The GraphQL query requested information about a specific character, identified by the ID 11. The server responded with 
a JSON object that contains an array of episodes in which this character appeared. The array contains one episode 
object, which includes an "id" field and a "name" field. The episode object corresponds to the "A Rickle in Time" 
episode, and its "id" field is 12.
Ask a question or type "exit" to quit
> exit
````