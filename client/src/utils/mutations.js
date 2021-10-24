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


export const CONTACT_SUBMIT = gql`
  mutation contactSubmit($name: String!, $email: String!, $message: String!) {
    contactSubmit(name: $name, email: $email, message: $message) {
      name
      email
      message
    }
  }`