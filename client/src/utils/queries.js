import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      appointments {
        day
        time
        _id
        createdAt
        groomer
        services
        size
      }
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
