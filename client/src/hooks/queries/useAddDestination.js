import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDestination } from 'src/service/data/destinations';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';

export const useAddNewDestination = () => {
    const queryClient = useQueryClient();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (data) => createDestination(data),
        onSuccess: () => {
            queryClient.invalidateQueries([queryEndpoints.destinations]);
            queryClient.invalidateQueries([queryEndpoints.creatorDestinations]);
        },
    });

    return [mutate, error, isLoading];
};
