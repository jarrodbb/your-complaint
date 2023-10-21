// Import gql function from Apollo Client library
import { gql } from '@apollo/client';

// Define GraphQL mutations. Each mutation corresponds to an operation that modifies data on the server.
// Mutation to create a new complaint. It takes the 'category' and 'text' as input and returns the created complaint's data.
export const CREATE_COMPLAINT = gql`
mutation createComplaint($category: String!, $text: String!) {
  createComplaint($category: $$category, text: $text) {
    _id
    $category
    text
    createdAt
    }
  }
`;

// Mutation to update an existing complaint. It takes the 'id' of the complaint and the new 'text' as input and returns the updated complaint's data.
export const UPDATE_COMPLAINT = gql`
mutation updateComplaint($id: ID!, $text: String!) {
  updateComplaint($id: $id, text: $text) {
    _id
    category
    text
    createdAt
    }
  }
`;

// Mutation to delete a complaint. It takes the 'id' of the complaint as input and returns the deleted complaint's data.
export const DELETE_COMPLAINT = gql`
mutation deleteComplaint($id: ID!) {
  deleteComplaint(id: $id) {
    _id
    }
  }
`;