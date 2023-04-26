import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { deletePlace } from '../../service/data/places';

export const useDeletePlace = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (placeId) => deletePlace(placeId),
        onSuccess: (data) => {
            const { placeId } = data;

            const destination = queryClient.getQueryData([
                queryEndpoints.editDestination,
                destinationId,
            ]);

            const updatedDestination = {
                ...destination,
                places: destination.places.filter((p) => p._id !== placeId),
            };

            queryClient.setQueryData(
                [queryEndpoints.editDestination, destinationId],
                updatedDestination
            );

            queryClient.invalidateQueries([
                queryEndpoints.destination,
                destinationId,
            ]);

            queryClient.invalidateQueries([
                queryEndpoints.editPlacePermissions,
                placeId,
            ]);

            queryClient.invalidateQueries([queryEndpoints.place, placeId]);
        },
    });

    return [mutate, error, isLoading];
};
