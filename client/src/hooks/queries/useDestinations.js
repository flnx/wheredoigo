import { useQueries } from '@tanstack/react-query';
import { getMostLikedDestinations } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getPlaces } from '../../service/data/places';

export const useDestinationsAndPlaces = () => {
    const [destinations, places] = useQueries({
        queries: [
            { queryKey: [queryEndpoints.destinations], queryFn: getMostLikedDestinations },
            { queryKey: [queryEndpoints.places], queryFn: getPlaces },
        ],
    });

    return [destinations, places];
};
