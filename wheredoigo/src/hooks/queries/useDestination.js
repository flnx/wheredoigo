import { useQueries } from '@tanstack/react-query';
import { getDestination } from '../../service/data/destinations';
import { getPlaces } from '../../service/data/places';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useDestination = (destinationId) => {
    const [destination, places] = useQueries({
        queries: [
            {
                queryKey: [queryEndpoints.destinations, destinationId],
                queryFn: () => getDestination(destinationId),
            },
            {
                queryKey: [queryEndpoints.destinationPlaces, destinationId],
                queryFn: () => getPlaces(destinationId),
            },
        ],
    });

    return { destination, places };
};
