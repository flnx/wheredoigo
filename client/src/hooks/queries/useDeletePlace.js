import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { deletePlace } from '../../service/data/places';

export const useDeletePlace = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (placeId) => deletePlace(placeId),
        onSuccess: (placeId) => {
            queryClient.invalidateQueries([queryEndpoints.place, placeId]);
            queryClient.invalidateQueries([queryEndpoints.destination, destinationId]);
            queryClient.invalidateQueries([queryEndpoints.destPermissions, destinationId]);
        },
    });

    return [mutate, error, isLoading]
};
