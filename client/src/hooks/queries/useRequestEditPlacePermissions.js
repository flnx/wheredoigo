import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getEditPlacePermissions } from '../../service/data/permissions';

export const useRequestEditPlacePermissions = (placeId) => {
    const { data, error, isLoading } = useQuery({
        queryKey: [queryEndpoints.editPlacePermissions, placeId],
        queryFn: () => getEditPlacePermissions(placeId),
        staleTime: 1 * 60 * 1000, // 1 minute
        cacheTime: 2 * 60 * 1000, // 2 minutes
    });

    return [data, error, isLoading];
};