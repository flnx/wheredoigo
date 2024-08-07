import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';
import { likeDestination } from 'src/service/data/destinations';

export const useLikeDestination = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, error } = useMutation({
        mutationFn: (likeData) => likeDestination(destinationId, likeData),
        onSuccess: (result) => {
            const destination = queryClient.getQueryData([
                queryEndpoints.destination,
                destinationId,
            ]);

            const updatedDestination = {
                ...destination,
                isLikedByUser: result.isLike,
            };

            queryClient.setQueriesData(
                [queryEndpoints.destination, destinationId],
                updatedDestination
            );

            queryClient.invalidateQueries([queryEndpoints.userActivity]);
            queryClient.invalidateQueries([queryEndpoints.destinations]);
            queryClient.invalidateQueries([queryEndpoints.userFavorites]);
        },
    });

    return [mutate, isLoading, error];
};
