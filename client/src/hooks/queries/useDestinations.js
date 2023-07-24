import { useQueries } from '@tanstack/react-query';
import { getMostLikedDestinations } from 'src/service/data/destinations';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';
import { getTopPlaces } from 'src/service/data/places';

export const useDestinationsAndPlaces = () => {
    const [destinations, places] = useQueries({
        queries: [
            {
                queryKey: [queryEndpoints.destinations],
                queryFn: getMostLikedDestinations,
            },
            {
                queryKey: [queryEndpoints.places],
                queryFn: getTopPlaces,
            },
        ],
    });

    const isLoading = destinations.isLoading || places.isLoading;

    // Determine if the server is down
    const queryNetworkError = destinations.error?.message === 'Network Error';
    const query2NetworkError = places.error?.message === 'Network Error';
    const serverError = queryNetworkError && query2NetworkError;

    return [destinations, places, isLoading, serverError];
};
