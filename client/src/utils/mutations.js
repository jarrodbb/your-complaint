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
