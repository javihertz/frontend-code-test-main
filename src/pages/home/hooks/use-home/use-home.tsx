import { useQuery } from 'urql';
import { HomeQuery } from '../../../../generated/graphql';
import { GET_HOME_QUERY } from '../../../../queries/home-queries';

type PeopleDTO = Pick<HomeQuery, 'allPeople'>;

export function useHome() {
  const [{ data, fetching, error }] = useQuery<PeopleDTO>({
    query: GET_HOME_QUERY,
  });

  return {
    data: data?.allPeople,
    hasError: !!error,
    isLoading: fetching,
  };
}
