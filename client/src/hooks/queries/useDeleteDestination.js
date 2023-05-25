import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDestination } from '../../service/data/destinations';
// import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useDeleteDestination = () => {
    const queryClient = useQueryClient();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (destinationId) => deleteDestination(destinationId),
        onSuccess: () => {
            queryClient.invalidateQueries();
            queryClient.clear();
        },
    });

    return [mutate, error, isLoading]
};
