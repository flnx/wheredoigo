import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { deletePlace } from '../../service/data/places';

export const useDeletePlace = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (placeId) => deletePlace(placeId),
        onSuccess: (data) => {
            const { placeId } = data;

            queryClient.invalidateQueries([queryEndpoints.destination, destinationId]);
            queryClient.invalidateQueries([queryEndpoints.editDestPermissions, destinationId]);
            queryClient.invalidateQueries([queryEndpoints.place, placeId]);
            queryClient.invalidateQueries([queryEndpoints.editPlacePermissions, placeId]);
        },
    });

    return [mutate, error, isLoading]
};
