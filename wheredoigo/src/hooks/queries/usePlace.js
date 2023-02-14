import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getPlace } from '../../service/data/places';

export const usePlace = (placeId) => {
    return useQuery({
        queryKey: [queryEndpoints.places, placeId],
        queryFn: () => getPlace(placeId),
    });
};
