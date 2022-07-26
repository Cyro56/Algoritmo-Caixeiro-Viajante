import React from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import GetPath from './component/getPath';

const link = new HttpLink({uri: 'http://localhost:4000/graphql'});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GetPath />
    </ApolloProvider>
  );
}
export default App;
