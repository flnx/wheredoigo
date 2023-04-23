import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { deleteDestinationImage } from '../../service/data/destinations';

export const useDeleteDestinationImage = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, isSuccess, error } = useMutation({
        mutationFn: (imageId) => deleteDestinationImage(destinationId, imageId),

        onSuccess: () => {
            queryClient.invalidateQueries([queryEndpoints.destination, destinationId]);
            queryClient.invalidateQueries([queryEndpoints.destinations]);
            queryClient.invalidateQueries([queryEndpoints.creatorDestinations]);
        },
    });

    return [mutate, error, isLoading];
};