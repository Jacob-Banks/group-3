// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs

const typeDefs = gql`
  type Appointment {
    _id: ID
    day: String
    time: String
    username: String
    createdAt: String
    services: String
    size: String
    groomer: String
  }
  type User {
    _id: ID
    username: String
    email: String
    appointments: [Appointment]
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    appointment(_id: ID!): Appointment
    appointments(day: String): [Appointment]
  }

  type Auth {
    token: ID!
    user: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addAppointment(
      day: String!
      time: String!
      services: String
      size: String
      groomer: String
    ): Appointment
    cancelAppointment(_id: String!): Appointment
  }
`;

// export the typeDefs
module.exports = typeDefs;
