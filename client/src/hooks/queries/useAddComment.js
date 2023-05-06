import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../../service/data/comments';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useAddComment = (placeId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userComment) => addComment(userComment, placeId),
        onSuccess: (newComment) => {
            // Retrieve the current places data from the cache
            const place = queryClient.getQueryData([
                queryEndpoints.place,
                placeId,
            ]);

            // Update the places query data in the cache

            const updatedPlace = {
                ...place,
                comments: [...place.comments, newComment],
            };

            queryClient.setQueryData(
                [queryEndpoints.place, placeId],
                updatedPlace
            );
        },
    });
};
