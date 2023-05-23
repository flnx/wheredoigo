import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeComment } from '../../service/data/comments';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useRemoveComment = (commentId, placeId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, isSuccess, error } = useMutation({
        mutationFn: () => removeComment(placeId, commentId),
        onSuccess: (result) => {
            const { averageRating } = result;

            const place = queryClient.getQueryData([queryEndpoints.place, placeId]);
            // Update the places query data in the cache
            const updatedPlace = {
                ...place,
                hasCommented: false,
                averageRating: averageRating || 0,
            };

            queryClient.setQueryData([queryEndpoints.place, placeId], updatedPlace);
            queryClient.invalidateQueries([queryEndpoints.userActivity]);
            queryClient.invalidateQueries([queryEndpoints.placeComments, placeId]);
            queryClient.invalidateQueries([queryEndpoints.places]);
        },
    });

    return [mutate, isLoading, error];
};
