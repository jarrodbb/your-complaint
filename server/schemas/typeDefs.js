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
    description: String!
    image: [String]
    createdAt: String
    comments: [Comments]
}

type Comments {
    _id: ID!
    author: String!
    description: String!
    created: Sting
    image: [String]
    link: String
}

type Auth {
    token: ID!
    user: User
  }


type Query {
    me: User
    complaints: [Complaint]
}

type Mutation {
    login(email: String!, password: String!): Auth
    adduser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String!, email: String!, password: String!): User
    addComplaint(description: String!, image: [String]): User
    updateComplaint(complaintID:ID!, description: String!, image: [String]): Complaint
    deleteComplaint(complaintID:ID!): User
    addComment(complaintID:ID!, author: String!, description: String!, image: [String], link: String): Complaint
    updateComment( complaintID:ID!, commentID:ID!, description: String!, image: [String], link: String): Complaint
    removeComment(complaintID:ID!, commentID!): Complaint
}

`;

module.exports = typeDefs;
