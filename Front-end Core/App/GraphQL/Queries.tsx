import {gql} from '@apollo/client';

export const getPath = gql`
  query {
    getRecipes(initial: "A", final: "C") {
      id
      path
    }
  }
`;
