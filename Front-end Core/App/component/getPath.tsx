import React from 'react';
import {Text} from 'react-native';
import {useQuery} from '@apollo/client';
import {getPath} from '../GraphQL/Queries';

function GetPath() {
  const {error, loading, data} = useQuery(getPath);
  try {
    console.log('LOADING: ' + loading);
    return <Text>{data?.getRecipes[0].path}</Text>;
  } catch {
    return <Text>{JSON.stringify(error, null, 2)}</Text>;
  }
}

export default GetPath;
