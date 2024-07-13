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
    navigate(`/person/${personId}?personNumber=${index + 1}`);
  };

  return (
    <div className='people' data-testid='people-list'>
      {people?.edges?.map((person, index) => (
        <Card
          key={person?.node?.id ?? index}
          onCallbackClick={() => handleOnClickPerson(person?.node?.id, index)}
        >
          <p className='person-name'>{person?.node?.name ?? 'Missing Name'}</p>
        </Card>
      ))}
    </div>
  );
}
