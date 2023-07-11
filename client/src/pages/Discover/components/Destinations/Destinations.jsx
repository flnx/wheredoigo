import { ClipLoader } from 'react-spinners';
import { useInfiniteDestinations } from '../../../../hooks/queries/useInfiniteDestinations';
import { useErrorBoundary } from 'react-error-boundary';
import { DestinationsGrid } from '../../../../components/DestinationsGrid/DestinationsGrid';

import styles from './Destinations.module.css';
import { extractServerErrorMessage } from '../../../../utils/utils';
import { ButtonGlow } from '../../../../components/Buttons/Button-Glow/ButtonGlow';

export const Destinations = ({ searchParam, categoryParams }) => {
    const { showBoundary } = useErrorBoundary();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        error,
        serverError,
        isRefetching,
        refetch,
    } = useInfiniteDestinations(searchParam, categoryParams);

    if (serverError) {
        showBoundary(serverError);
        return null;
    }

    const loadingClass = (isFetchingNextPage || !hasNextPage) && styles.loading;

    // React Query infiniteScroll returns "pages" array of arrays
    // Each array inside of it represents a "page". And each page contains the currently fetched results
    // To extract each page result, It's just easy to flatten them and "later" map through all the results
    const destinations = data?.pages.flatMap((arr) => arr.result) ?? [];

    // No results found
    const notFound = !isFetching && destinations.length == 0;

    return (
        <section>
            {error ? (
                <div className={styles.errors}>
                    <h2 className="server-error">{extractServerErrorMessage(error)}</h2>
                    <ButtonGlow onClickHandler={refetch} isLoading={isRefetching}>
                        Retry
                    </ButtonGlow>
                </div>
            ) : (
                <>
                    <div className={styles.categories}>
                        <h2>Destinations</h2>
                    </div>

                    <div className={styles.destinations}>
                        <DestinationsGrid
                            destinations={destinations || []}
                            background={'#fff'}
                        />

                        {isFetching && <div className={styles.overlay} />}

                        <ClipLoader
                            color="#36d7b7"
                            size={40}
                            loading={isFetching}
                            aria-label="Loading Spinner"
                            className={styles.spinner}
                        />
                    </div>

                    {notFound && (
                        <h3 className="mb-2">
                            Oops! No destination matches found. New options coming soon 🦖
                        </h3>
                    )}

                    <button
                        onClick={fetchNextPage}
                        disabled={!hasNextPage || isFetchingNextPage}
                        className={`${styles.btn} ${loadingClass}`}
                    >
                        {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </button>
                </>
            )}
        </section>
    );
};
