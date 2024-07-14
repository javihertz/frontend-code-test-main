import { useMemo } from 'react';
import { PersonDTO, PersonMap } from '../../interfaces/person.interface';

type ProducersList = {
  [k: string]: {
    name: string;
    timesWorked: number;
  };
};

export function usePersonMap(data: PersonDTO | undefined) {
  return useMemo(() => {
    if (!data?.person) {
      return undefined;
    }

    const producersList = data.person.filmConnection.films.reduce(
      (acc: ProducersList, film) => {
        film.producers.forEach((producer) => {
          if (acc[producer]) {
            acc[producer].timesWorked++;
          } else {
            acc[producer] = { name: producer, timesWorked: 1 };
          }
        });
        return acc;
      },
      {}
    );

    const filmsList = data.person.filmConnection.films.map((film) => ({
      title: film.title,
      releaseDate: film.releaseDate,
      planetsWithoutWater: film.planetConnection.planets.filter(
        (planet) => planet.surfaceWater === 0
      ).length,
    }));

    const personMap: PersonMap = {
      personName: data.person.name,
      producersList: Object.entries(producersList).map(([, info]) => info),
      averageHeight: data.person.species?.averageHeight ?? 'Missing Data',
      filmsList,
    };

    return personMap;
  }, [data]);
}
