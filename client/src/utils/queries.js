// Import the 'gql' function from Apollo Client
// It allows us to define GraphQL queries using GraphQL syntax within JavaScript files
import { gql } from '@apollo/client';


// Define GraphQL queries. Each query corresponds to an operation that retrieves data from the server

// Query to fetch a list of complaints. It doesn't require any input and returns an array of complaint objects
export const GET_COMPLAINTS = gql`
query getComplaints {
  complaints {
    _id
    category
    text
    createdAt
    }
  }
`;

// Query to fetch a specific complaint by its 'id.' It takes 'id' as input and returns the complaint's data.
export const GET_COMPLAINT = gql`
query getComplaint($id: ID!) {
  complaint(_id: $id) {
    _id
    category
    text
    createdAt
    }
  }
`;

// Query to fetch a list of users. It doesn't require any input and returns an array of user objects.
export const GET_USERS = gql`
query getUsers {
  users {
    _id
    username
    email
    }
  }
`;

// Query to fetch a specific user by their 'id.' It takes 'id' as input and returns the user's data.
export const GET_USER = gql`
query getUser($id: ID!) {
  user(_id: $id) {
    _id
    username
    email
    }
  }
`;