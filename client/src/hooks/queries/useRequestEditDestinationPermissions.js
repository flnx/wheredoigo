import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getEditDestinationPermissions } from '../../service/data/permissions';

export const useRequestEditDestinationPermissions = (destinationId) => {
    return useQuery({
        queryKey: [queryEndpoints.destPermissions, destinationId],
        queryFn: () => {
            if (!destinationId) {
                throw new Error('Invalid destination name');
            }            
            return getEditDestinationPermissions(destinationId);
        },
        staleTime: 1 * 60 * 1000, // 1 minute
        cacheTime: 2 * 60 * 1000, // 2 minutes
    });
};
