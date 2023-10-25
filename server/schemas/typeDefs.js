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
    title: String!
    description: String!
    category: String!
    image: String
    date: String
    votes: Int
    createdAt: String
    comments: [Comments]
}

type Comments {
    _id: ID!
    author: String!
    description: String!
    created: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
  }


type Query {
    me: User
    complaints: [Complaints]
    complaint(complaintID: ID!): Complaints
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!, email: String!, password: String!): User
    addComplaint(description: String!, category: String!,date: String, image: [String]): User
    updateComplaint(complaintID: ID!, votes: Int, category: String!, description: String!, image: [String]): Complaints
    deleteComplaint(complaintID: ID!): User
    addComment(complaintID: ID!, author: String!, description: String!, image: [String], link: String): Complaints
    updateComment( complaintID: ID!, commentID:ID!, description: String!, image: [String], link: String): Complaints
    removeComment(complaintID: ID!, commentID:ID!): Complaints
}

`;

module.exports = typeDefs;
