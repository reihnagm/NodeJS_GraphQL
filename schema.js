const { gql } = require("apollo-server-express");
const { User } = require("./db");

// Define GraphQL types
const typeDefs = gql`
  type Query {
    hello: String
    users: [User!]!
  }

  type User {
    id: ID!
    email: String!
    created_at: String!
    updated_at: String!
  }
`;

// Resolver with DB call
const resolvers = {
  Query: {
    hello: () => "Hello World!",
    users: async () => {
      const users = await User.findAll();
      return users;
    },
  },
  User: {
    created_at: (parent) => parent.createdAt.toISOString(),
    updated_at: (parent) => parent.updatedAt.toISOString(),
  },
};

module.exports = { typeDefs, resolvers };
