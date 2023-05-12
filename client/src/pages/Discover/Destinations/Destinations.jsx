import { useInfiniteDestinations } from '../../../hooks/queries/useInfiniteDestinations';
import { Destination } from './Destination';

import styles from './Destinations.module.css';

export const Destinations = ({ searchParam, categoryParams }) => {
    const { 
        data, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage, 
        isLoading 
    } = useInfiniteDestinations(searchParam, categoryParams);


    const loadingClass = (isFetchingNextPage || !hasNextPage) && styles.loading;

    if (isLoading) return <h1>Loading...</h1>;

    return (
        <section>
            <div className={styles.categories}>
                <span>Destinations</span>
            </div>
            <div className={styles.destinations}>
                {data.pages
                    .flatMap((arr) => arr.result)
                    .map((destination) => (
                        <Destination key={destination._id} destination={destination} />
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
