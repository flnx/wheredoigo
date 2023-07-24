import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';
import { getCreatePlacePermissions } from 'src/service/data/permissions';

export const useRequestCreatePlacePermissions = (destinationId) => {
    const { data, isLoading, error } = useQuery({
        queryKey: [queryEndpoints.createPlacePermissions, destinationId],
        queryFn: () => getCreatePlacePermissions(destinationId),
    });

    return { data, isLoading, error };
};
