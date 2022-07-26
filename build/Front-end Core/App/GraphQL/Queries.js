"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPath = void 0;
const client_1 = require("@apollo/client");
exports.getPath = (0, client_1.gql) `
  query {
    getRecipes {
      id
      path
    }
  }
`;
