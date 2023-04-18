import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getEditDestinationPermissions } from '../../service/data/permissions';

export const useRequestEditDestinationPermissions = (destinationId) => {
    return useQuery({
        queryKey: [queryEndpoints.permissions, destinationId],
        queryFn: () => getEditDestinationPermissions(destinationId),
        staleTime: 1 * 60 * 1000, // 1 minute
        cacheTime: 2 * 60 * 1000, // 2 minutes
    });
};
