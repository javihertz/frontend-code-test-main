import { screen } from '@testing-library/react';
import { customRender } from '../../utils/custom-render';
import Person from './person';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams('personNumber=1')],
}));

const mockData = jest.fn().mockReturnValue({
  averageHeight: 'Missing Data',
  filmsList: [
    {
      planetsWithoutWater: 0,
      releaseDate: '1977-05-25',
      title: 'A New Hope',
    },
    {
      planetsWithoutWater: 1,
      releaseDate: '1980-05-17',
      title: 'The Empire Strikes Back',
    },
  ],
  personName: 'Luke Skywalker',
  producersList: [
    { name: 'Gary Kurtz', timesWorked: 2 },
    { name: 'Rick McCallum', timesWorked: 2 },
  ],
});

const mockIsLoading = jest.fn().mockReturnValue(false);
const mockHasError = jest.fn().mockReturnValue(false);

jest.mock('./hooks/use-person/use-person.tsx', () => ({
  usePerson: () => ({
    data: mockData(),
    hasError: mockHasError(),
    isLoading: mockIsLoading(),
  }),
}));

describe('Person', () => {
  describe('when is loading the data', () => {
    it('should show a loader', () => {
      mockIsLoading.mockReturnValueOnce(true);

      customRender(<Person />);

      const loader = screen.getByTestId('loader');

      expect(loader).toBeInTheDocument();
    });
  });

  describe('when has an error loading the data', () => {
    it('should show an error message', () => {
      mockHasError.mockReturnValueOnce(true);

      customRender(<Person />);

      const errorMessage = screen.getByText(/unexpected error/i);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('when has data to be shown', () => {
    it('should show the person', () => {
      customRender(<Person />);

      const personHeader = screen.getByText('Person 1 Luke Skywalker');
      const personInfo = screen.getByTestId('person-info');
      const filmsList = screen.getByTestId('films-list');

      expect(personHeader).toBeInTheDocument();
      expect(personInfo).toBeInTheDocument();
      expect(filmsList).toBeInTheDocument();
    });
  });

  describe('when the data is empty', () => {
    it('should show an empty message', () => {
      mockData.mockReturnValueOnce(undefined);
      customRender(<Person />);

      const emptyMessage = screen.getByText(
        /no information to be shown about this person/i
      );

      expect(emptyMessage).toBeInTheDocument();
    });
  });
});
