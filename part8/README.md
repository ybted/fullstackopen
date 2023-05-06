## `part8`

### a.` GraphQL`-server

1. `Schemas`

```js
type Person {
  name: String!
  phone: String
  street: String!
  city: String!
  id: ID! 
}

type Query {
  personCount: Int!
  allPersons: [Person!]!
  findPerson(name: String!): Person
}
```

`!` represents for `must be given a unique value`(`Non-null`)

The schema describes what queries the client can send to the server, what kind of parameters the queries can have, and what kind of data the queries return.

2. Queries

```js
query {
  personCount
}
```

```js
query {
  allPersons {
    name
    phone
  }
}
```

```js
query {
  findPerson(name: "Arto Hellas") {
    phone 
    city 
    street
    id
  }
}
```

3. Apollo Server 

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
```

the first parameter contains the `GraphQL` schema

the second parameter contains the resolvers of the server

4. the default resolver 

A `GraphQL`server must define resolvers for each field of each type in the schema.

The default resolver returns the value of the corresponding field of the object. 

5. Mutations 

```js'
type Mutation {
  addPerson(
    name: String!
    phone: String
    street: String!
    city: String!
  ): Person
}
```

6. resolver

```js
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  }
}
```

### b. React and GraphQL

1. `useQuery`

```js
const App = () => {
  const result = useQuery(ALL_PERSONS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <Persons persons={result.data.allPersons}/>
  )
}
```

2. `useMutation`

We can define mutation functions using the useMutation hook. The hook returns an array, the first element of which contains the function to cause the mutation.

```js
const [ createPerson ] = useMutation(CREATE_PERSON)

//...
createPerson({  variables: { name, phone, street, city } })
```

