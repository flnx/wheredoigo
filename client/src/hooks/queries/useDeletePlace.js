import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDestination } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useDeletePlace = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (destinationId) => deleteDestination(destinationId),
        onSuccess: () => {
            queryClient.invalidateQueries([queryEndpoints.place, destinationId]);
            queryClient.invalidateQueries([queryEndpoints.destination, destinationId]);
            queryClient.invalidateQueries([queryEndpoints.destPermissions, destinationId]);
        },
    });

    return [mutate, error, isLoading]
};
