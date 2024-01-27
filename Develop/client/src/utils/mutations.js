import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($bookInput: BookInput!) {
    saveBook(bookInput: $bookInput) {
      id
      username
      email
      savedBooks {
        id
        title
        author
        description
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      id
      username
      email
      savedBooks {
        id
        title
        author
        description
      }
    }
  }
`;
