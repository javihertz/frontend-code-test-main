import { useParams, useSearchParams } from 'react-router-dom';
import { ErrorBasic } from '../../components/error-basic/error-basic';
import { Loader } from '../../components/loader/loader';
import { FilmsList } from './components/films-list/films-list';
import { PersonInfo } from './components/person-info/person-info';
import { usePerson } from './hooks/use-person/use-person';
import './person.css';

interface PersonContainerProps {
  children: React.ReactNode;
  personName?: string;
}

const PersonContainer = ({ children, personName }: PersonContainerProps) => {
  const [searchParams] = useSearchParams();

  return (
    <main className='person'>
      <h1>
        Person {searchParams.get('personNumber')} {personName}
      </h1>
      {children}
    </main>
  );
};

const Person = () => {
  const { personId } = useParams();
  const { data, isLoading, hasError } = usePerson(personId as string);

  if (isLoading) {
    return (
      <PersonContainer>
        <Loader />
      </PersonContainer>
    );
  }

  if (hasError) {
    return (
      <PersonContainer>
        <ErrorBasic />
      </PersonContainer>
    );
  }

  if (data) {
    return (
      <PersonContainer personName={data.personName}>
        <div className='person-info'>
          <PersonInfo
            averageHeight={data.averageHeight}
            producersList={data.producersList}
          />
          <FilmsList filmsList={data.filmsList} />
        </div>
      </PersonContainer>
    );
  }

  return (
    <PersonContainer>
      <h1>There's no information to be shown in the list</h1>
    </PersonContainer>
  );
};

export default Person;
