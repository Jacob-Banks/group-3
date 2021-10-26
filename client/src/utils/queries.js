import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;
export const QUERY_APPOINTMENTS_DAY = gql`
  query appointments($day: String!) {
    appointments(day: $day) {
      time
      groomer
    }
  }
`;
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email

      appointments {
        _id
        day
        time
        services
        size
        createdAt
        groomer
      }
    }
  }
`;
export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;
export const QUERY_APPOINTMENTS = gql`
  {
    appointment {
      _id: ID
      day: String
      time: String
      username: String
      createdAt: String
      services: String
      size: String
      groomer: String
    }
  }
`;

export const QUERY_APPOINTMENTS_USER = gql`
  query appointments($username: String!) {
    appointments(username: $username) {
      _id
      username
      day
      time
      services
      size
      groomer
    }
  }
`;