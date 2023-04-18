import { Destination } from '../../../components/Destination/Destination';
import styles from './Destinations.module.css';

export const Destinations = () => {
    return (
        <section>
            <div className="container">
                <h2 className={styles.title}>Highest rated destinations:</h2>
                <div className={styles.wrapper}>
                    {/* {topDestinationsByRating.map((x) => (
                        <Destination key={x.country} destination={x} />
                    ))} */}
                </div>
            </div>
        </section>
    );
};