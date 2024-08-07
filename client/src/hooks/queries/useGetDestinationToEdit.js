import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';
import { getDestinationToEdit } from 'src/service/data/permissions';

export const useGetDestinationToEdit = (destinationId) => {
    const { data, error, isLoading } = useQuery({
        queryKey: [queryEndpoints.editDestination, destinationId],
        queryFn: () => getDestinationToEdit(destinationId),
        // staleTime: 0.25 * 60 * 1000, // 15 seconds
        // cacheTime: 0.5 * 60 * 1000, // 30 seconds
    });

    return [data, error, isLoading];
};
