// Import gql function from Apollo Client library
import { gql } from "@apollo/client";

// Define GraphQL mutations. Each mutation corresponds to an operation that modifies data on the server.
// Mutation to create a new complaint. It takes the 'category' and 'text' as input and returns the created complaint's data.
export const CREATE_COMPLAINT = gql`
  mutation addComplaint(
    $description: String!
    $title: String!
    $category: String!
    $date: String
    $image: String
  ) {
    addComplaint(
      description: $description
      title: $title
      category: $category
      date: $date
      image: $image
    ) {
      _id
      username
      email
      password
      isModerator
      complaints {
        _id
        title
        description
        category
        image
        date
        votes
        unsupportedVotes
        created
        comments {
          _id
          author
          description
          createdAt
          image
          link
        }
      }
    }
  }
`;

// Mutation to update an existing complaint. It takes the 'id' of the complaint and the new 'text' as input and returns the updated complaint's data.
export const UPDATE_COMPLAINT = gql`
  mutation updateComplaint($id: ID!, $text: String!) {
    updateComplaint(id: $id, text: $text) {
      _id
      category
      title
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

// Mutation to register a new user. It takes 'username,' 'email,' and 'password' as input and returns a user token and user data.
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation to log in a user. It takes 'email' and 'password' as input and returns a user token and user data.
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation createVote($complaintID: ID!) {
    createVote(complaintID: $complaintID) {
      _id
      title
      description
      category
      image
      date
      votes
      created
      comments {
        _id
        author
        description
        createdAt
        image
        link
      }
    }
  }
`;

export const CREATE_VOTE_UNSUPPORTED = gql`
  mutation createVoteUnsupported($complaintID: ID!) {
    createVoteUnsupported(complaintID: $complaintID) {
      _id
      title
      description
      category
      image
      date
      votes
      unsupportedVotes
      created
      comments {
        _id
        author
        description
        createdAt
        image
        link
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation addComment(
    $complaintID: ID!
    $author: String!
    $description: String!
  ) {
    addComment(
      complaintID: $complaintID
      author: $author
      description: $description
    ) {
      _id
      title
      description
      category
      image
      date
      votes
      unsupportedVotes
      created
      comments {
        _id
        author
        description
        createdAt
        image
        link
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment(
    $complaintID: ID!
    $commentID: ID!
    $description: String!
    $author: String!
  ) {
    updateComment(
      complaintID: $complaintID
      commentID: $commentID
      description: $description
      author: $author
    ) {
      _id
      title
      description
      category
      image
      date
      votes
      unsupportedVotes
      created
      comments {
        _id
        author
        description
        createdAt
        image
        link
      }
    }
  }
`;
