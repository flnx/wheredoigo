import { useInfinitePlaces } from '../../../hooks/queries/useInfinitePlaces';
import { Destination } from './Destination';
import styles from './Destinations.module.css';

export const Destinations = () => {
    const {data, fetchNextPage, hasNextPage} = useInfinitePlaces();

    return (
        <section>
            <div className={styles.destinations}>
                <Destination />
                <Destination />
                <Destination />
                <Destination />
                <Destination />
            </div>
            <button onClick={fetchNextPage}>Load more</button>
        </section>
    );
};
