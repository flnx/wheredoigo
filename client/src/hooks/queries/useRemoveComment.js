import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeComment } from '../../service/data/comments';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useRemoveComment = (commentId, placeId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, isSuccess, error } = useMutation({
        mutationFn: () => removeComment(placeId, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries([queryEndpoints.placeComments, placeId]);
        },
    });

    return [mutate, isLoading, error];
};
