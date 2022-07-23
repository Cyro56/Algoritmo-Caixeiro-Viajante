"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const cityResolver_1 = require("./src/resolvers/cityResolver");
async function bootstrap() {
    const server = new apollo_server_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [cityResolver_1.Reciperesolver],
        }),
    });
    server.listen(4000);
}
bootstrap();
