import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_APPOINTMENT = gql`
  mutation addAppointment(
    $day: String!
    $time: String!
    $services: String
    $size: String
    $groomer: String
  ) {
    addAppointment(
      day: $day
      time: $time
      services: $services
      size: $size
      groomer: $groomer
    ) {
      _id
      username
      day
      time
      services
      createdAt
      size
      groomer
    }
  }
`;

export const CANCEL_APPOINTMENT = gql `
mutation cancelAppointment($_id: String!) {
  cancelAppointment(_id: $_id) {
    _id
  }
}
`;