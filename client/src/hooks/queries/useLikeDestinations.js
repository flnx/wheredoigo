import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { likeDestination } from '../../service/data/destinations';

export const useLikeDestination = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, error } = useMutation({
        mutationFn: () => likeDestination(destinationId),
        onSuccess: () => {
            const destination = queryClient.getQueryData([
                queryEndpoints.destination,
                destinationId,
            ]);

            const updatedDestination = {
                ...destination,
                isLikedByUser: true,
            };

            queryClient.setQueriesData(
                [queryEndpoints.destination, destinationId],
                updatedDestination
            );
        },
    });

    return [mutate, isLoading, error];
};
