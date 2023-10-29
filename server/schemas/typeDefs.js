const typeDefs = `
type User {
    _id: ID!
    username: String
    email: String
    password: String
    isModerator: String
    complaints: [Complaints]
}

type Complaints {
    _id: ID!
    title: String
    description: String
    category: String
    username: String
    image: String
    date: String
    votes: Int
    unsupportedVotes: Int
    created: String
    comments: [Comments]
}

type Comments {
    _id: ID!
    author: String!
    description: String!
    createdAt: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
  }

  type Message {
    message: String
  }


type Query {
    me: User
    complaints: [Complaints]
    complaint(complaintID: ID!): Complaints
    userComplaint(complaintID: ID!): User
    complaintsByCategory(category: String!): [Complaints]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    deleteUser(userID: ID! username: String!): Message
    updateUser(username: String!, email: String!, password: String): Auth
    addComplaint(description: String!, title:String!, category: String!, username: String, date: String, image: String): User
    updateComplaint(complaintID: ID!, title:String, category: String, description: String!, date:String): Complaints
    deleteComplaint(complaintID: ID!): User
    addComment(complaintID: ID!, author: String!, description: String!): Complaints
    updateComment( complaintID: ID!, commentID:ID!, description: String!, author:String!): Complaints
    removeComment(complaintID: ID!, commentID:ID!): Complaints
    createVote(complaintID: ID!): Complaints
    createVoteUnsupported(complaintID: ID!): Complaints
    adminDelete(complaintID: ID!, username: String!): [Complaints]
}

`;

module.exports = typeDefs;
