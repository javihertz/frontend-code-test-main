import { gql } from 'urql';

export const GET_PERSON_QUERY = gql`
  query Person($personId: ID) {
    person(id: $personId) {
      birthYear
      name
      species {
        averageHeight
      }
      filmConnection {
        films {
          producers
          planetConnection {
            planets {
              surfaceWater
            }
          }
          title
          releaseDate
        }
      }
    }
  }
`;
