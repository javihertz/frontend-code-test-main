import { useNavigate } from 'react-router-dom';
import { HomeQuery } from '../../../../generated/graphql';

interface PeopleListProps {
  people: HomeQuery['allPeople'];
}

export function PeopleList({ people }: PeopleListProps) {
  const navigate = useNavigate();

  const handleOnClickPerson = (personId: string | undefined) => {
    if (!personId) {
      throw new Error('ERROR_MISSING_PERSON_ID'); // NOTE: It can be handled by the errorElement of react router dom
    }

    navigate(`/person/${personId}`);
  };

  return (
    <ul className='people'>
      {people?.edges?.map((person) => (
        <li
          className='person'
          key={person?.node?.id}
          onClick={() => handleOnClickPerson(person?.node?.id)}
        >
          <p className='person-name'>{person?.node?.name ?? 'Missing Name'}</p>
        </li>
      ))}
    </ul>
  );
}
