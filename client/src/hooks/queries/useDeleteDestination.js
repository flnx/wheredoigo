import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDestination } from 'src/service/data/destinations';

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
