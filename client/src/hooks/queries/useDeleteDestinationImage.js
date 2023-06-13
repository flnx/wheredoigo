import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { deleteDestinationImage } from '../../service/data/destinations';

export const useDeleteDestinationImage = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, error } = useMutation({
        mutationFn: (imageId) => deleteDestinationImage(destinationId, imageId),

        onSuccess: (imageData) => {
            const { imgId } = imageData;

            const destination = queryClient.getQueryData([
                queryEndpoints.editDestination,
                destinationId,
            ]);

            const updatedDestination = {
                ...destination,
                imageUrls: destination?.imageUrls.filter(x => x._id !== imgId)
            }

            queryClient.setQueryData(
                [queryEndpoints.editDestination, destinationId],
                updatedDestination
            );

            queryClient.invalidateQueries([queryEndpoints.destination, destinationId]);
            queryClient.invalidateQueries([queryEndpoints.destinations]);
            queryClient.invalidateQueries([queryEndpoints.creatorDestinations]);
        },
    });

    return [mutate, error, isLoading];
};