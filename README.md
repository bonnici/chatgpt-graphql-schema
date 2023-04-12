# ChatGPT GraphQL Schema

A fairly hacky experiment that allows plain English interaction with public GraphQL endpoints using ChatGPT.

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
npm start -- https://countries.trevorblades.com/

> chatgpt-graphql-schema@1.0.0 start
> node index.js https://countries.trevorblades.com/

379 tokens in schema, each question will cost about 0.15 cents

User input:
> what are the names of all the countries in oceania?

GraphQL query from ChatGPT:
```
{
  continent(code: "OC") {
    countries {
      name
    }
  }
}
```

Response from GraphQL endpoint:
{"data":{"continent":{"countries":[{"name":"American Samoa"},{"name":"Australia"},{"name":"Cook Islands"},{"name":"Fiji"},{"name":"Micronesia"},{"name":"Guam"},{"name":"Kiribati"},{"name":"Marshall Islands"},{"name":"Northern Mariana Islands"},{"name":"New Caledonia"},{"name":"Norfolk Island"},{"name":"Nauru"},{"name":"Niue"},{"name":"New Zealand"},{"name":"French Polynesia"},{"name":"Papua New Guinea"},{"name":"Pitcairn Islands"},{"name":"Palau"},{"name":"Solomon Islands"},{"name":"Tokelau"},{"name":"East Timor"},{"name":"Tonga"},{"name":"Tuvalu"},{"name":"U.S. Minor Outlying Islands"},{"name":"Vanuatu"},{"name":"Wallis and Futuna"},{"name":"Samoa"}]}}}

ChatGPT's interpretation of response:
This is a list of all the countries in Oceania. The list includes American Samoa, Australia, Cook Islands, Fiji, Micronesia, Guam, Kiribati, Marshall Islands, Northern Mariana Islands, New Caledonia, Norfolk Island, Nauru, Niue, New Zealand, French Polynesia, Papua New Guinea, Pitcairn Islands, Palau, Solomon Islands, Tokelau, East Timor, Tonga, Tuvalu, U.S. Minor Outlying Islands, Vanuatu, Wallis and Futuna, and Samoa. Each country is represented by an object in the array, with a "name" field that gives the name of the country.

User input:
> what currency do they use in australia?

GraphQL query from ChatGPT:
```
{
  country(code: "AU") {
    currency
  }
}
```

Response from GraphQL endpoint:
{"data":{"country":{"currency":"AUD"}}}

ChatGPT's interpretation of response:
The currency used in Australia is AUD.

User input:
> what other countries use that currency?

GraphQL query from ChatGPT:
```
{
  countries(filter: { currency: { eq: "AUD" } }) {
    name
  }
}
```

Response from GraphQL endpoint:
{"data":{"countries":[{"name":"Australia"},{"name":"Cocos [Keeling] Islands"},{"name":"Christmas Island"},{"name":"Heard Island and McDonald Islands"},{"name":"Kiribati"},{"name":"Norfolk Island"},{"name":"Nauru"},{"name":"Tuvalu"}]}}

ChatGPT's interpretation of response:
These are the countries that use the "AUD" currency: Australia, Cocos (Keeling) Islands, Christmas Island, Heard Island and McDonald Islands, Kiribati, Norfolk Island, Nauru, and Tuvalu. The response includes an array of objects, each representing a country that uses AUD, and each object has a "name" field that gives the name of the country.

User input:
> what's the ID of Kiribati?

GraphQL query from ChatGPT:
```
{
  country(code: "KI") {
    code
  }
}
```

Response from GraphQL endpoint:
{"data":{"country":{"code":"KI"}}}

ChatGPT's interpretation of response:
The ID of Kiribati is "KI".

User input:
> give me all the information you have on that country

GraphQL query from ChatGPT:
```
{
  country(code: "KI") {
    name
    capital
    code
    emoji
    currencies
    continent {
      name
    }
    states {
      name
    }
    languages {
      name
    }
  }
}
```

Response from GraphQL endpoint:
{"data":{"country":{"name":"Kiribati","capital":"South Tarawa","code":"KI","emoji":"🇰🇮","currencies":["AUD"],"continent":{"name":"Oceania"},"states":[],"languages":[{"name":"English"}]}}}

ChatGPT's interpretation of response:
This is all the information available for Kiribati, as returned by the API:

- "name": the name of the country ("Kiribati").
- "capital": the capital of the country ("South Tarawa").
- "code": the unique code of the country ("KI").
- "emoji": the flag emoji for the country ("🇰🇮").
- "currencies": an array of the currencies used in the country (in this case, just "AUD").
- "continent": an object that represents the continent the country is in, which has a "name" field that gives the name of the continent ("Oceania").
- "states": an array of the country's sub-national divisions; in this case, it's empty because Kiribati doesn't have any states or provinces.
- "languages": an array of the official languages spoken in the country (in this case, just "English").
````

### Using https://barcelona-urban-mobility-graphql-api.netlify.app/graphql to ask about public transport in Barcelona

````
npm start -- https://barcelona-urban-mobility-graphql-api.netlify.app/graphql

> chatgpt-graphql-schema@1.0.0 start
> node index.js https://barcelona-urban-mobility-graphql-api.netlify.app/graphql

2262 tokens in schema, each question will cost about 0.90 cents

User input:
> where is the "Encants" metro station and what lines run on it?

GraphQL query from ChatGPT:
```
{
  metroStation(findBy: {name: "Encants"}) {
    name
    coordinates {
      latitude
      longitude
    }
    lines
  }
}
```

Response from GraphQL endpoint:
{"errors":[{"message":"Cannot query field \"name\" on type \"MetroStationQueryResponse\". Did you mean to use an inline fragment on \"MetroStation\"?","extensions":{}},{"message":"Cannot query field \"coordinates\" on type \"MetroStationQueryResponse\". Did you mean to use an inline fragment on \"MetroStation\"?","extensions":{}},{"message":"Cannot query field \"lines\" on type \"MetroStationQueryResponse\". Did you mean to use an inline fragment on \"MetroStation\"?","extensions":{}}]}

Corrected GraphQL query from ChatGPT:
I'm sorry about that, here's the valid query:
```
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

Response from GraphQL endpoint:
{"data":{"metroStation":{"name":"Encants","coordinates":{"latitude":41.407236,"longitude":2.1827},"lines":["L2"]}}}

ChatGPT's interpretation of response:
The "Encants" metro station is located at latitude 41.407236 and longitude 2.1827, and it belongs to line L2.

User input:
> what other stations are on that line?

GraphQL query from ChatGPT:
```
{
  metroLine(findBy: {id: 2}) {
    stations {
      edges {
        node {
          name
        }
      }
    }
  }
}
```

Response from GraphQL endpoint:
{"errors":[{"message":"Cannot query field \"stations\" on type \"MetroLineQueryResponse\". Did you mean to use an inline fragment on \"MetroLine\"?","extensions":{}}]}

Corrected GraphQL query from ChatGPT:
I'm sorry about that, here's the valid query:
```
{
  metroLine(findBy: {id: 2}) {
    ... on MetroLine {
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

Response from GraphQL endpoint:
{"data":{"metroLine":{"stations":{"edges":[{"node":{"name":"Tetuan"}},{"node":{"name":"Monumental"}},{"node":{"name":"Clot"}},{"node":{"name":"Sant Martí"}},{"node":{"name":"Gorg"}},{"node":{"name":"Sagrada Família"}},{"node":{"name":"Badalona Pompeu Fabra"}},{"node":{"name":"Passeig de Gràcia"}},{"node":{"name":"Encants"}},{"node":{"name":"Sant Roc"}},{"node":{"name":"Pep Ventura"}},{"node":{"name":"Sant Antoni"}},{"node":{"name":"Universitat"}},{"node":{"name":"Bac de Roda"}},{"node":{"name":"Artigues | Sant Adrià"}},{"node":{"name":"Verneda"}},{"node":{"name":"Paral·lel"}},{"node":{"name":"La Pau"}}]}}}}

ChatGPT's interpretation of response:
The stations that belong to line L2 are: Tetuan, Monumental, Clot, Sant Martí, Gorg, Sagrada Família, Badalona Pompeu Fabra, Passeig de Gràcia, Encants, Sant Roc, Pep Ventura, Sant Antoni, Universitat, Bac de Roda, Artigues | Sant Adrià, Verneda, Paral·lel, and La Pau.

User input:
> find the closest bike station to Encant's location

GraphQL query from ChatGPT:
```
{
  bikeStations(first: 1, filterBy: {only: {isInService: true}}) {
    edges {
      node {
        name
        coordinates {
          latitude
          longitude
        }
        distanceTo(location: {latitude: 41.407236, longitude: 2.1827})
      }
    }
  }
}
```

Response from GraphQL endpoint:
{"errors":[{"message":"Cannot query field \"distanceTo\" on type \"BikeStation\".","extensions":{}}]}

Corrected GraphQL query from ChatGPT:
I'm sorry about that, here's the valid query:
```
{
  bikeStations(first: 1, filterBy: {only: {isInService: true}}) {
    edges {
      node {
        name
        coordinates {
          latitude
          longitude
        }
      }
      distance
    }
  }
}
```

Response from GraphQL endpoint:
{"errors":[{"message":"Cannot query field \"distance\" on type \"BikeStationEdge\".","extensions":{}}]}

User input:
> That still didn't work. You need to use the bikeStation query from that schema and pass the location into the findBy field.

GraphQL query from ChatGPT:
I apologize for the confusion earlier. Here's the valid query to solve your question:
```
{
  bikeStation(findBy: {closest: {latitude: 41.407236, longitude: 2.1827}}) {
    name
    coordinates {
      latitude
      longitude
    }
  }
}
```

Response from GraphQL endpoint:
{"errors":[{"message":"Cannot query field \"name\" on type \"BikeStationQueryResponse\". Did you mean to use an inline fragment on \"BikeStation\"?","extensions":{}},{"message":"Cannot query field \"coordinates\" on type \"BikeStationQueryResponse\". Did you mean to use an inline fragment on \"BikeStation\"?","extensions":{}}]}

Corrected GraphQL query from ChatGPT:
I'm sorry about that, here's the valid query:
```
{
  bikeStation(findBy: {closest: {latitude: 41.407236, longitude: 2.1827}}) {
    ... on BikeStation {
      name
      coordinates {
        latitude
        longitude
      }
    }
  }
}
```

Response from GraphQL endpoint:
{"data":{"bikeStation":{"name":"C/ DOS DE MAIG, 230-232","coordinates":{"latitude":41.4071692,"longitude":2.1820722}}}}

ChatGPT's interpretation of response:
The bike station closest to the Encants location is located at C/ DOS DE MAIG, 230-232, and its coordinates are latitude 41.4071692 and longitude 2.1820722.
````

### Using https://space-courses-api.herokuapp.com/ to find and update tracks

````
npm start -- https://space-courses-api.herokuapp.com/

> chatgpt-graphql-schema@1.0.0 start
> node index.js https://space-courses-api.herokuapp.com/

774 tokens in schema, each question will cost about 0.31 cents

User input:
> what are the tracks shown on the home screen?

GraphQL query from ChatGPT:
```
{
  tracksForHome {
    id
    title
    thumbnail
    author {
      name
    }
  }
}
```

Response from GraphQL endpoint:
{"data":{"tracksForHome":[{"id":"c_0","title":"Cat-stronomy, an introduction","thumbnail":"https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg","author":{"name":"Henri, le Chat Noir"}},{"id":"c_1","title":"Famous Catstronauts","thumbnail":"https://res.cloudinary.com/dety84pbu/image/upload/v1598474100/famous_cats_epuqcr.jpg","author":{"name":"Grumpy Cat"}},{"id":"c_2","title":"Kitty space suit, all you need to know","thumbnail":"https://res.cloudinary.com/dety84pbu/image/upload/v1598457117/spaceSuite_knkmu8.jpg","author":{"name":"Scratchy"}},{"id":"c_3","title":"Cat-strophysics, master class","thumbnail":"https://res.cloudinary.com/dety84pbu/image/upload/v1598475110/catstrophysicist_bqfh9n.jpg","author":{"name":"Garfield"}},{"id":"c_4","title":"Crew Dragon, kitty edition","thumbnail":"https://res.cloudinary.com/dety84pbu/image/upload/v1598464617/crew_dragon_ayxwp8.jpg","author":{"name":"Thomas O'Malley"}},{"id":"c_5","title":"Solar System, crash track","thumbnail":"https://res.cloudinary.com/dety84pbu/image/upload/v1598476307/solar_ynf4mf.jpg","author":{"name":"Mr Bitey"}},{"id":"c_6","title":"Mars-A-CAT, for dummies","thumbnail":"https://images.unsplash.com/photo-1448222993383-a2fff2914d27?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzA0OH0","author":{"name":"Cheshire Cat"}},{"id":"c_8","title":"Cat-strodynamics 101","thumbnail":"https://images.unsplash.com/photo-1585731158597-39208f9a06e2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzA0OH0","author":{"name":"Lil Bub"}},{"id":"c_9","title":"Rover Driving, for beginners","thumbnail":"https://res.cloudinary.com/dety84pbu/image/upload/v1598627737/rover-cat_hv1aan.jpg","author":{"name":"Mr Bigglesworth"}},{"id":"c_10","title":"To The Moon, 7 steps program","thumbnail":"https://images.unsplash.com/photo-1442291928580-fb5d0856a8f1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzA0OH0","author":{"name":"Felix"}},{"id":"c_11","title":"Space CATastrophes, pro level","thumbnail":"https://images.unsplash.com/photo-1593627010886-d34828365da7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzA0OH0","author":{"name":"Nyan Cat"}},{"id":"c_12","title":"Kitty Rockets, the hard way","thumbnail":"https://images.unsplash.com/photo-1556089969-9928c26e7edf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzA0OH0","author":{"name":"Puss in boots"}},{"id":"c_13","title":"Space-Cat-Walk, best practices","thumbnail":"https://images.unsplash.com/photo-1520008150259-a95a6e8df6cc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzA0OH0","author":{"name":"Thomas O'Malley"}}]}}

ChatGPT's interpretation of response:
The response contains an array of objects, which represent the tracks that are shown on the homepage. Each object contains the `id`, `title`, `thumbnail`(an image for each track), and `author` object that contains a `name` for the author of each track. The array contains multiple objects, each representing a different track that is displayed on the homepage.

User input:
> increment the views for the track named "Cat-strodynamics 101"

GraphQL query from ChatGPT:
```
mutation {
  incrementTrackViews(id: "c_8") {
    code
    success
    message
    track {
      id
      title
      numberOfViews
    }
  }
}
```

Response from GraphQL endpoint:
{"data":{"incrementTrackViews":{"code":200,"success":true,"message":"Successfully incremented number of views for track c_8","track":{"id":"c_8","title":"Cat-strodynamics 101","numberOfViews":1}}}}

ChatGPT's interpretation of response:
The response indicates that the mutation was successful. The `code` is an HTTP-status code of 200, and the `message` is a human-readable message. The `success` field is set to `true`, confirming a successful mutation. The `track` field contains information about the track whose views where incremented. Its `id` is "c_8", and its `title` is "Cat-strodynamics 101". Finally, the new `numberOfViews` field is set to 1, indicating that the number of views for that track has been incremented by 1.
````

### Using https://rickandmortyapi.com/graphql to get info about the characters in the show

````
npm start -- https://rickandmortyapi.com/graphql     

> chatgpt-graphql-schema@1.0.0 start
> node index.js https://rickandmortyapi.com/graphql

1114 tokens in schema, each question will cost about 0.45 cents

User input:
> what are the names and ids of some of the characters on the show?

GraphQL query from ChatGPT:
Here is a query that would return information on the first 5 characters:
```
{
  characters(page: 1) {
    results {
      id
      name
    }
  }
}
```

Response from GraphQL endpoint:
{"data":{"characters":{"results":[{"id":"1","name":"Rick Sanchez"},{"id":"2","name":"Morty Smith"},{"id":"3","name":"Summer Smith"},{"id":"4","name":"Beth Smith"},{"id":"5","name":"Jerry Smith"},{"id":"6","name":"Abadango Cluster Princess"},{"id":"7","name":"Abradolf Lincler"},{"id":"8","name":"Adjudicator Rick"},{"id":"9","name":"Agency Director"},{"id":"10","name":"Alan Rails"},{"id":"11","name":"Albert Einstein"},{"id":"12","name":"Alexander"},{"id":"13","name":"Alien Googah"},{"id":"14","name":"Alien Morty"},{"id":"15","name":"Alien Rick"},{"id":"16","name":"Amish Cyborg"},{"id":"17","name":"Annie"},{"id":"18","name":"Antenna Morty"},{"id":"19","name":"Antenna Rick"},{"id":"20","name":"Ants in my Eyes Johnson"}]}}}

ChatGPT's interpretation of response:
The response includes an array of data representing information on the first 20 characters from the first page of results. For each character, there is an ID and name. The characters returned are in order based on their database id, with Rick Sanchez being the first character. The next page of results can be obtained with `{ characters(page: 2) {...` and so on.

User input:
> what episodes was Albert Einstein in?

GraphQL query from ChatGPT:
According to the schema, Albert Einstein has not been in any episodes. If you'd like you can provide me with another question.

User input:
> that's not correct, he was present in the response of my first query

GraphQL query from ChatGPT:
My apologies, it appears there was an error in my previous response. To answer your question, you can use the following GraphQL query:

```
{
  character(id: 11) {
    name
    episode {
      name
    }
  }
}
```

This query will retrieve the name of Albert Einstein as well as a list of all episode names that he appeared in.

Response from GraphQL endpoint:
{"data":{"character":{"name":"Albert Einstein","episode":[{"name":"A Rickle in Time"}]}}}

ChatGPT's interpretation of response:
The response indicates that Albert Einstein was in the episode called "A Rickle in Time".
````
