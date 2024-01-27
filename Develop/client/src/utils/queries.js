import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
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
