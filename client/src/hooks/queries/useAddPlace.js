import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { createPlace } from '../../service/data/places';

export const useAddNewPlace = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => createPlace(data, destinationId),
        onSuccess: () => {
            queryClient.invalidateQueries([
                queryEndpoints.destination,
                destinationId,
            ]);

            queryClient.invalidateQueries([
                queryEndpoints.editDestination,
                destinationId,
            ]);
        },
    });

    return [mutate, isLoading];
};
