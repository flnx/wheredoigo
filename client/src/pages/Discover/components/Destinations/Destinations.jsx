import { ClipLoader } from 'react-spinners';
import { useInfiniteDestinations } from '../../../../hooks/queries/useInfiniteDestinations';
import { Destination } from './Destination';

import styles from './Destinations.module.css';

export const Destinations = ({ searchParam, categoryParams }) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
        useInfiniteDestinations(searchParam, categoryParams);

    const loadingClass = (isFetchingNextPage || !hasNextPage) && styles.loading;

    return (
        <section>
            <div className={styles.categories}>
                <span>Destinations</span>
            </div>
            <div className={styles.destinations}>
                {data?.pages
                    .flatMap((arr) => arr.result)
                    .map((destination) => (
                        <Destination key={destination._id} destination={destination} />
                    ))}
                {isFetching && <div className={styles.overlay} />}
                <ClipLoader
                    color="#36d7b7"
                    size={40}
                    loading={isFetching}
                    aria-label="Loading Spinner"
                    className={styles.spinner}
                />
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
