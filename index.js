const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema");
const { sequelize } = require("./db");

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  // Test DB connection
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected!");

    // Optional: Sync DB
    await sequelize.sync(); // Don't use force: true in prod
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
