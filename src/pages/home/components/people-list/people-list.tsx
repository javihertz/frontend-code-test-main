import { useNavigate } from 'react-router-dom';
import { Card } from '../../../../components/card/card';
import { HomeQuery } from '../../../../generated/graphql';
import './people-list.css';

interface PeopleListProps {
  people: HomeQuery['allPeople'];
}

export function PeopleList({ people }: PeopleListProps) {
  const navigate = useNavigate();

  const handleOnClickPerson = (personId: string | undefined, index: number) => {
    if (!personId) {
      throw new Error('ERROR_MISSING_PERSON_ID'); // NOTE: It can be handled by the errorElement of react router dom, having a dictionary to show custom errors
    }

    navigate(`/person/${personId}?personNumber=${index + 1}`);
  };

  return (
    <div className='people'>
      {people?.edges?.map((person, index) => (
        <Card
          key={person?.node?.id}
          onCallbackClick={() => handleOnClickPerson(person?.node?.id, index)}
        >
          <p className='person-name'>{person?.node?.name ?? 'Missing Name'}</p>
        </Card>
      ))}
    </div>
  );
}
