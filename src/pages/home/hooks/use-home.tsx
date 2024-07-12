import { gql, useQuery } from 'urql';
import { HomeQuery } from '../../../generated/graphql';

type PeopleDTO = Pick<HomeQuery, 'allPeople'>;
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
  const [{ data, fetching, error }] = useQuery<PeopleDTO>({ query });

  return {
    data: data?.allPeople,
    hasError: !!error,
    isLoading: fetching,
  };
}
