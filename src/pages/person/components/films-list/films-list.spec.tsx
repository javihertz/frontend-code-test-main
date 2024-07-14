import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '../../../../utils/custom-render';
import { FilmsList } from './films-list';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

const mockFilmsList = jest.fn().mockReturnValue([
  {
    title: 'A New Hope',
    releaseDate: '1977-05-25',
    planetsWithoutWater: 0,
  },
  {
    title: 'The Empire Strikes Back',
    releaseDate: '1980-05-17',
    planetsWithoutWater: 1,
  },
]);

describe('FilmsList', () => {
  it('should render the film recieved', () => {
    customRender(<FilmsList filmsList={mockFilmsList()} />);

    const filmName = screen.getByText('Name: A New Hope');
    const filmReleaseDate = screen.getByText('Release Date: 1977-05-25');
    const filmPlanetsWithoutWater = screen.getByText(
      'Planets without water: 0'
    );

    expect(filmName).toBeInTheDocument();
    expect(filmReleaseDate).toBeInTheDocument();
    expect(filmPlanetsWithoutWater).toBeInTheDocument();
  });

  describe('when has more than one film', () => {
    const user = userEvent.setup();

    describe('and the "Prev" and "Next" buttons are clicked', () => {
      it('should be able to switch films back and forth', async () => {
        customRender(<FilmsList filmsList={mockFilmsList()} />);

        const firstFilmNameText = /A New Hope/i;
        const secondFilmNameText = /The Empire Strikes Back/i;
        const firstFilmName = screen.getByText(firstFilmNameText);
        const missingSecondFilmName = screen.queryByText(secondFilmNameText);

        expect(firstFilmName).toBeInTheDocument();
        expect(missingSecondFilmName).not.toBeInTheDocument();

        const nextButton = screen.getByRole('button', { name: 'Next' });

        await user.click(nextButton);

        const missingFirstFilmName = screen.queryByText(firstFilmNameText);
        const secondFilmName = screen.getByText(secondFilmNameText);

        expect(missingFirstFilmName).not.toBeInTheDocument();
        expect(secondFilmName).toBeInTheDocument();

        const prevButton = screen.getByRole('button', { name: 'Prev' });

        await user.click(prevButton);

        expect(firstFilmName).toBeInTheDocument();
        expect(missingSecondFilmName).not.toBeInTheDocument();
      });
    });
  });
});
