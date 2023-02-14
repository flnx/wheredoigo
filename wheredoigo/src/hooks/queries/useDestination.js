import { useQueries } from '@tanstack/react-query';
import { getDestination } from '../../service/data/destinations';
import { getPlaces } from '../../service/data/places';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useDestination = (id) => {
    const [destination, places] = useQueries({
        queries: [
            {
                queryKey: [queryEndpoints.destinations, id],
                queryFn: () => getDestination(id),
            },
            {
                queryKey: [queryEndpoints.places, id],
                queryFn: () => getPlaces(id),
            },
        ],
    });

    return { destination, places };
};
