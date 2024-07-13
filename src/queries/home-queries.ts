import { gql } from 'urql';

export const GET_HOME_QUERY = gql`
  query Home {
    allPeople {
      edges {
        node {
          birthYear
          height
          id
          name
        }
      }
    }
  }
`;
