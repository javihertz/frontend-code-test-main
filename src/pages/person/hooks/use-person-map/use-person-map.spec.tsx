import { renderHook } from '@testing-library/react';
import { usePersonMap } from './use-person-map';

const mockPerson = jest.fn().mockReturnValue({
  person: {
    birthYear: '19BBY',
    name: 'Luke Skywalker',
    species: null,
    filmConnection: {
      films: [
        {
          producers: ['Gary Kurtz', 'Rick McCallum'],
          planetConnection: {
            planets: [
              {
                surfaceWater: 1,
                __typename: 'Planet',
              },
              {
                surfaceWater: 40,
                __typename: 'Planet',
              },
              {
                surfaceWater: 8,
                __typename: 'Planet',
              },
            ],
            __typename: 'FilmPlanetsConnection',
          },
          title: 'A New Hope',
          releaseDate: '1977-05-25',
          __typename: 'Film',
        },
        {
          producers: ['Gary Kurtz', 'Rick McCallum'],
          planetConnection: {
            planets: [
              {
                surfaceWater: 100,
                __typename: 'Planet',
              },
              {
                surfaceWater: 8,
                __typename: 'Planet',
              },
              {
                surfaceWater: 0,
                __typename: 'Planet',
              },
              {
                surfaceWater: 10,
                __typename: 'Planet',
              },
            ],
            __typename: 'FilmPlanetsConnection',
          },
          title: 'The Empire Strikes Back',
          releaseDate: '1980-05-17',
          __typename: 'Film',
        },
      ],
    },
  },
});

describe('usePersonMap', () => {
  describe('when does not recieves a person', () => {
    it('should return an undefined', () => {
      const { result } = renderHook(() => usePersonMap(undefined));

      expect(result.current).toBeUndefined();
    });
  });

  describe('when recieves a person', () => {
    it('should return the person map', () => {
      const { result } = renderHook(() => usePersonMap(mockPerson()));

      expect(result.current).toStrictEqual({
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
    });
  });
});
