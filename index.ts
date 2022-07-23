import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { Reciperesolver } from "./src/resolvers/cityResolver";
async function bootstrap() {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Reciperesolver],
    }),
  });
  server.listen(4000);
}

bootstrap();
