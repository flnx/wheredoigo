import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeComment } from '../../service/data/comments';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useRemoveComment = (commentId, placeId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, isSuccess, error } = useMutation({
        mutationFn: () => removeComment(placeId, commentId),
        onSuccess: () => {
            // Retrieve the current places data from the cache
            const place = queryClient.getQueryData([
                queryEndpoints.place,
                placeId,
            ]);

            // Update the places query data in the cache
            const updatedPlace = {
                ...place,
                comments: place.comments.filter(
                    (comment) => comment._id != commentId
                ),
            };

            queryClient.setQueryData(
                [queryEndpoints.place, placeId],
                updatedPlace
            );
        },
    });

    return [mutate, isLoading, error];
};
