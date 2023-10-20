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
    image: String
    createdAt: String
    comments: [Comments]
}

type Comments {
    _id: ID!
    author: String!
    description: String!
    created: Sting
    image: String
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
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addComplaint(description: String!, image: String): User
    updateComplaint(description: String!, image: String): Complaint
    deleteComplaint(_id:ID!): User
    addComment(author: String!, description: String!, image: String, link: String): Complaint
    updateComment( description: String!, image: String, link: String): Complaint
    removeComment(_id:ID!): Complaint
}

`;

module.exports = typeDefs;
