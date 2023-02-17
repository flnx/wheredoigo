import { useInfiniteDestinations } from '../../../hooks/queries/useInfiniteDestinations';
import { Destination } from './Destination';

import styles from './Destinations.module.css';

export const Destinations = () => {
    const { 
        data, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage
     } = useInfiniteDestinations();

    if (!data) return;

    const loadingClass = (isFetchingNextPage || !hasNextPage) && styles.loading;

    return (
        <section>
            <div className={styles.categories}>
                <span>Destinations</span>
            </div>
            <div className={styles.destinations}>
                {data.pages
                    .flatMap((arr) => arr)
                    .map((destination) => (
                        <Destination key={destination.objectId} destination={destination} />
                    ))}
            </div>
            <button
                onClick={fetchNextPage}
                disabled={!hasNextPage || isFetchingNextPage}
                className={`${styles.btn} ${loadingClass}`}
            >
                {isFetchingNextPage ? 'Loading...' : 'Load More'}
            </button>
        </section>
    );
};
