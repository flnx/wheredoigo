import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';
import { getPlace } from 'src/service/data/places';

export const usePlace = (placeId) => {
    const { isLoading, data, error } = useQuery({
        queryKey: [queryEndpoints.place, placeId],
        queryFn: () => getPlace(placeId),
    });

    return { data, isLoading, error };
};