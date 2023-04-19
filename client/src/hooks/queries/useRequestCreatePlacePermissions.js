import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getCreatePlacePermissions } from '../../service/data/permissions';

export const useRequestCreatePlacePermissions = (destinationId) => {
    return useQuery({
        queryKey: [queryEndpoints.placePermissions, destinationId],
        queryFn: () => getCreatePlacePermissions(destinationId),
        staleTime: 1 * 60 * 1000, // 1 minute
        cacheTime: 2 * 60 * 1000, // 2 minutes
    });
};