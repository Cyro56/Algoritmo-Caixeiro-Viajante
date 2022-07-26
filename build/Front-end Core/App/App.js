"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("@apollo/client");
const getPath_1 = __importDefault(require("./component/getPath"));
const link = new client_1.HttpLink({ uri: 'http://localhost:4000/graphql' });
console.log(link, 'link');
const client = new client_1.ApolloClient({
    cache: new client_1.InMemoryCache(),
    link: link,
});
function App() {
    return (<client_1.ApolloProvider client={client}>
      <getPath_1.default />
    </client_1.ApolloProvider>);
}
exports.default = App;
