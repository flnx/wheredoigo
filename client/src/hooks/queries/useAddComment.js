import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../../service/data/comments';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useAddComment = (placeId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userComment) => addComment(userComment, placeId),
        onSuccess: () => {
            queryClient.invalidateQueries([queryEndpoints.placeComments, placeId]);
        },
    });
};
