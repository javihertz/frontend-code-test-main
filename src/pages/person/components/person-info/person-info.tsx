import { PersonMap } from '../../interfaces/person.interface';

interface PersonInfoProps {
  averageHeight: PersonMap['averageHeight'];
  producersList: PersonMap['producersList'];
}

export function PersonInfo({ averageHeight, producersList }: PersonInfoProps) {
  return (
    <>
      <section>
        <h2>Producers collaborations</h2>
        <ul>
          {producersList.map(({ name, timesWorked }) => (
            <li key={name}>
              <p>
                {`${name} - ${timesWorked} time${timesWorked > 1 ? 's' : ''}`}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Average Height</h2>
        <p>{averageHeight}</p>
      </section>
    </>
  );
}
