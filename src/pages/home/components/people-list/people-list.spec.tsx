import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { PeopleList } from './people-list';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

const customRender = (children: React.ReactElement) => {
  return render(<MemoryRouter>{children}</MemoryRouter>);
};

const mockPeopleList = jest.fn().mockReturnValue({
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

describe('PeoplesList', () => {
  it('should render the people recieved', () => {
    customRender(<PeopleList people={mockPeopleList()} />);

    const firstPerson = screen.getByText(/Luke Skywalker/i);
    const secondPerson = screen.getByText(/C-3PO/i);

    expect(firstPerson).toBeInTheDocument();
    expect(secondPerson).toBeInTheDocument();
  });

  describe('when a person is clicked', () => {
    const user = userEvent.setup();

    it('should perform a navigation', async () => {
      customRender(<PeopleList people={mockPeopleList()} />);

      const firstPerson = screen.getByText(/Luke Skywalker/i);

      await user.click(firstPerson);

      expect(mockUseNavigate).toHaveBeenNthCalledWith(
        1,
        '/person/cGVvcGxlOjE=?personNumber=1'
      );
    });
  });
});
