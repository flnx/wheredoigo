import { useInfinitePlaces } from '../../../hooks/queries/useInfinitePlaces';
import { Destination } from './Destination';
import styles from './Destinations.module.css';

export const Destinations = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfinitePlaces();

    if (!data) return;

    return (
        <section>
            <div className={styles.destinations}>
                {data.pages
                    .flatMap((x) => x)
                    .map((place) => (
                        <Destination key={place.objectId} place={place} />
                    ))}
            </div>
            <button
                onClick={fetchNextPage}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                Load more
            </button>
        </section>
    );
};
