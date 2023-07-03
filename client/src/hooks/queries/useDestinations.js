import { useQueries } from '@tanstack/react-query';
import { getMostLikedDestinations } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getTopPlaces } from '../../service/data/places';

export const useDestinationsAndPlaces = () => {
    const [destinations, places] = useQueries({
        queries: [
            { queryKey: [queryEndpoints.destinations], queryFn: getMostLikedDestinations },
            { queryKey: [queryEndpoints.places], queryFn: getTopPlaces },
        ],
    });

    return [destinations, places];
};
