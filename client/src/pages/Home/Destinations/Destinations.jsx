import { Container } from '../../../components/Containers/Container/Container';
import { Destination } from '../../Dashboard/components/OwnerDestinations/components/Destination';
import styles from './Destinations.module.css';

export const Destinations = () => {
    return (
        <section>
            <Container>
                <h2 className={styles.title}>Highest rated destinations:</h2>
                <div className={styles.wrapper}>
                    {/* {topDestinationsByRating.map((x) => (
                        <Destination key={x.country} destination={x} />
                    ))} */}
                </div>
            </Container>
        </section>
    );
};
