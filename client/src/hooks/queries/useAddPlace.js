import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { createPlace } from '../../service/data/places';

export const useAddNewPlace = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (data) => createPlace(data),
        onSuccess: () =>
            queryClient.invalidateQueries([
                queryEndpoints.destinations,
                destinationId,
            ]),
    });

    return [mutate, error, isLoading];
};
