import { ErrorBasic } from '../../components/error-basic/error-basic';
import { SkeletonCard } from '../../components/skeleton-card/skeleton-card';
import './home.css';
import { useHome } from './hooks/use-home';

const HomeContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='home'>
      <h1>People</h1>
      {children}
    </main>
  );
};

const Home = () => {
  const { data, isLoading, hasError } = useHome();

  if (isLoading) {
    return (
      <HomeContainer>
        <SkeletonCard />
      </HomeContainer>
    );
  }

  if (hasError) {
    return (
      <HomeContainer>
        <ErrorBasic />
      </HomeContainer>
    );
  }

  if (data) {
    return (
      <HomeContainer>
        <ul className='people'>
          {data?.edges?.map((person) => (
            <li className='person' key={person?.node?.id}>
              <p className='person-name'>{person?.node?.name}</p>
            </li>
          ))}
        </ul>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <h1>There's no people to be shown in the list</h1>
    </HomeContainer>
  );
};

export default Home;
