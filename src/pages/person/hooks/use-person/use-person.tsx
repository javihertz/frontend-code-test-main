import { useQuery } from 'urql';
import { GET_PERSON_QUERY } from '../../../../queries/person-queries';
import { PersonDTO } from '../../interfaces/person.interface';
import { usePersonMap } from '../use-person-map/use-person-map';

export function usePerson(personId: string) {
  const [{ data, fetching, error }] = useQuery<PersonDTO>({
    query: GET_PERSON_QUERY,
    variables: { personId },
  });

  const personMap = usePersonMap(data);
  console.log('🧪 debug 🧪 personMap:', personMap);

  return {
    data: personMap,
    hasError: !!error,
    isLoading: fetching,
  };
}
