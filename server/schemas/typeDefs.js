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
    day: String
    time: String
    username: String
    createdAt: String
    services: String
    size: String
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addAppointment(
      day: String!
      time: String!
      services: String
      size: String
    ): Appointment
  }
  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;
