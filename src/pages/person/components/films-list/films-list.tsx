import { useState } from 'react';
import { Card } from '../../../../components/card/card';
import { PersonMap } from '../../interfaces/person.interface';
import './films-list.css';

interface FilmListProps {
  filmsList: PersonMap['filmsList'];
}

export function FilmsList({ filmsList }: FilmListProps) {
  const [selectedFilm, setSelectedFilm] = useState(0);

  const handleOnPrevFilmClick = () => {
    setSelectedFilm((prev) => prev - 1);
  };

  const handleOnNextFilmClick = () => {
    setSelectedFilm((prev) => prev + 1);
  };

  return (
    <section>
      <h2>Films</h2>
      <Card>
        <div className='film'>
          <h2>{`Name: ${filmsList[selectedFilm]?.title}`}</h2>
          <h3>{`Release Date: ${filmsList[selectedFilm]?.releaseDate}`}</h3>
          <h3>{`Planets without water: ${filmsList[selectedFilm]?.planetWithoutWater}`}</h3>
        </div>
      </Card>
      <footer>
        <button
          type='button'
          disabled={selectedFilm === 0}
          onClick={handleOnPrevFilmClick}
        >
          Prev
        </button>
        <button
          type='button'
          disabled={selectedFilm === filmsList.length - 1}
          onClick={handleOnNextFilmClick}
        >
          Next
        </button>
      </footer>
    </section>
  );
}
