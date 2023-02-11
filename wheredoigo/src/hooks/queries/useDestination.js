import { useQueries } from '@tanstack/react-query';
import { getDestination } from '../../service/data/destinations';
import { getPlaces } from '../../service/data/places';
import { queryEndpoint } from '../../utils/constants';

export const useDestination = (id) => {
    const [destination, places] = useQueries({
        queries: [
            {
                queryKey: [queryEndpoint.destinations, id],
                queryFn: () => getDestination(id),
            },
            {
                queryKey: [queryEndpoint.places, id],
                queryFn: () => getPlaces(id),
            },
        ],
    });

    return { destination, places };
};
