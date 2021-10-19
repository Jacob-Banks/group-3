// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    appointment(_id: ID!): Appointment
    appointments(username: String): [Appointment]
  }
  type Appointment {
    _id: ID
    day: Int
    month: Int
    time: Int
    username: String
    createdAt: String
    services: String
    size: String
    cost: Int
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addAppointment(
      day: Int!
      month: Int!
      time: Int!
      services: String
      size: String
      cost: Int
    ): Appointment
  }
  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;
