import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateAIComments } from '../../service/data/comments';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useGenerateAIComments = (placeId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => generateAIComments(placeId),
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
            queryClient.invalidateQueries([queryEndpoints.userPlacesData]);
        },
    });
};