import { useQueries, useQuery } from '@tanstack/react-query';
import { getDestinations } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getPlaces } from '../../service/data/places';

export const useDestinations = () => {
    return useQuery({
        queryKey: [queryEndpoints.destinations],
        queryFn: getDestinations,
    });
};

export const useDestinationsAndPlaces = () => {
    return useQueries({
        queries: [
            { queryKey: [queryEndpoints.destinations], queryFn: getDestinations },
            { queryKey: [queryEndpoints.places], queryFn: getPlaces },
        ],
    });
};
