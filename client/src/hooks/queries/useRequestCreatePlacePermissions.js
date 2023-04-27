import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getCreatePlacePermissions } from '../../service/data/permissions';

export const useRequestCreatePlacePermissions = (destinationId) => {
    return useQuery({
        queryKey: [queryEndpoints.createPlacePermissions, destinationId],
        queryFn: () => getCreatePlacePermissions(destinationId),
    });
};