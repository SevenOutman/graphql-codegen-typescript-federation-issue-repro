import { gql } from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import type { Resolvers } from "./resolvers-types";

const typeDefs = gql`
  type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    username: String
  }
`;

const resolvers: Resolvers = {
  Query: {
    me() {
      return { id: "1", username: "@ava" };
    },
  },
  User: {
    // __resolveReference(user, { fetchUserById }) {
    //   return fetchUserById(user.id);
    // },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
