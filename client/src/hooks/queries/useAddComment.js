import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../../service/data/comments';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useAddComment = (placeId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userComment) => addComment(userComment, placeId),
        onSuccess: (result) => {
            const { averageRating } = result;

            const place = queryClient.getQueryData([queryEndpoints.place, placeId]);
            // Update the places query data in the cache
            const updatedPlace = {
                ...place,
                hasCommented: true,
                averageRating: averageRating,
            };

            queryClient.setQueryData([queryEndpoints.place, placeId], updatedPlace);
            queryClient.invalidateQueries([queryEndpoints.userActivity]);
            queryClient.invalidateQueries([queryEndpoints.placeComments, placeId]);
            queryClient.invalidateQueries([queryEndpoints.places]);
        },
    });
};
