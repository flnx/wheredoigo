import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getCreatePlacePermissions } from '../../service/data/places';

export const useRequestCreatePlacePermissions = (destinationId) => {
    return useQuery({
        queryKey: [queryEndpoints.placePermissions, destinationId],
        queryFn: () => getCreatePlacePermissions(destinationId),
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 60 * 60 * 1000, // 1 hour
    });
};