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
    }
  }
`;
