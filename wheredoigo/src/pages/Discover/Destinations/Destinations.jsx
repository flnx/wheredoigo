import { Destination } from './Destination';
import styles from './Destinations.module.css';

export const Destinations = () => {
    return (
        <section>
            <div className={styles.destinations}>
                <Destination />
                <Destination />
                <Destination />
                <Destination />
                <Destination />
            </div>
        </section>
    );
};
