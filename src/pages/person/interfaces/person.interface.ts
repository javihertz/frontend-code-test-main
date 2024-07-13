export interface PersonDTO {
  person: {
    birthYear: string;
    name: string;
    species: {
      averageHeight?: string;
    };
    filmConnection: {
      films: [
        {
          releaseDate: string;
          title: string;
          producers: string[];
          planetConnection: {
            planets: [
              {
                surfaceWater: number;
              }
            ];
          };
        }
      ];
    };
  };
}

export interface PersonMap {
  averageHeight: string;
  filmsList: {
    planetsWithoutWater: number;
    releaseDate: string;
    title: string;
  }[];
  personName: string;
  producersList: {
    name: string;
    timesWorked: number;
  }[];
}
