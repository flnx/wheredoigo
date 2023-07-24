import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';
import { createPlace } from 'src/service/data/places';

export const useAddNewPlace = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, error } = useMutation({
        mutationFn: (data) => createPlace(data, destinationId),
        onSuccess: () => {
            queryClient.invalidateQueries([
                queryEndpoints.destination,
                destinationId,
            ]);

            queryClient.invalidateQueries([queryEndpoints.places]);

            queryClient.invalidateQueries([
                queryEndpoints.editDestination,
                destinationId,
            ]);
        },
    });

    return [mutate, isLoading, error];
};
