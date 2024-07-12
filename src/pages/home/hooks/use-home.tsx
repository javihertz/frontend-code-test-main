import { gql, useQuery } from 'urql';

const query = gql`
  query Home {
    allPeople {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export function useHome() {
  const [{ data, fetching, error }] = useQuery({ query });

  return {
    data: data,
    hasError: error,
    isLoading: fetching,
  };
}
