import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { addDestinationNewImages } from '../../service/data/destinations';

export const useAddDestinationNewImages = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (files) => addDestinationNewImages(destinationId, files),
        onSuccess: (newImages) => {
            const destination = queryClient.getQueryData([
                queryEndpoints.editDestination,
                destinationId,
            ]);

            const updatedDestination = {
                ...destination,
                imageUrls: [...destination.imageUrls, ...newImages.imageUrls],
            };

            queryClient.setQueryData(
                [queryEndpoints.editDestination, destinationId],
                updatedDestination
            );

            queryClient.invalidateQueries([
                queryEndpoints.destination,
                destinationId,
            ]);

            queryClient.invalidateQueries([queryEndpoints.destinations]);
            queryClient.invalidateQueries([queryEndpoints.creatorDestinations]);
        },
    });

    return [mutate, error, isLoading];
};
