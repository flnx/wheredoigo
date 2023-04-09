import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addComment } from "../../service/data/comments";
import { queryEndpoints } from "../../constants/reactQueryEndpoints";


export const useAddComment = (placeId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => addComment(data, placeId),
        onSuccess: (newComment) => {
            queryClient.setQueryData([queryEndpoints.placeComments, newComment]);
            queryClient.invalidateQueries([queryEndpoints.placeComments])
        }
    });
}
