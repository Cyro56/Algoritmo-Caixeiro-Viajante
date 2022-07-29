import {gql} from '@apollo/client';

export const getPath = gql`
  query {
    getRecipes(initial: "B", final: "G") {
      id
      path
    }
  }
`;
