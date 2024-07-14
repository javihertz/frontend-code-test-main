import { screen } from '@testing-library/react';
import { customRender } from '../../utils/custom-render';
import Home from './home';

const mockData = jest.fn().mockReturnValue({
  edges: [
    {
      node: {
        id: 'cGVvcGxlOjE=',
        name: 'Luke Skywalker',
      },
    },
    {
      node: {
        id: 'cGVvcGxlOjI=',
        name: 'C-3PO',
      },
    },
  ],
});

const mockIsLoading = jest.fn().mockReturnValue(false);
const mockHasError = jest.fn().mockReturnValue(false);

jest.mock('./hooks/use-home/use-home.tsx', () => ({
  useHome: () => ({
    data: mockData(),
    hasError: mockHasError(),
    isLoading: mockIsLoading(),
  }),
}));

describe('Home', () => {
  describe('when is loading the data', () => {
    it('should show a loader', () => {
      mockIsLoading.mockReturnValueOnce(true);

      customRender(<Home />);

      const loader = screen.getByTestId('loader');

      expect(loader).toBeInTheDocument();
    });
  });

  describe('when has an error loading the data', () => {
    it('should show an error message', () => {
      mockHasError.mockReturnValueOnce(true);

      customRender(<Home />);

      const errorMessage = screen.getByText(/unexpected error/i);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('when has data to be shown', () => {
    it('should show the people list', () => {
      customRender(<Home />);

      const peopleList = screen.getByTestId('people-list');

      expect(peopleList).toBeInTheDocument();
    });
  });

  describe('when the data is empty', () => {
    it('should show an empty message', () => {
      mockData.mockReturnValueOnce({
        edges: [],
      });
      customRender(<Home />);

      const emptyMessage = screen.getByText(/no people to be shown/i);

      expect(emptyMessage).toBeInTheDocument();
    });
  });
});
