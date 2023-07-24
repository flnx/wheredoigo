import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';
import { addPlaceNewImages } from 'src/service/data/places';

export const useAddPlaceNewImages = (placeId, destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (files) => addPlaceNewImages(placeId, files),
        onSuccess: (newImages) => {
            // To Do: Caching instead of invalidating

            const place = queryClient.getQueryData([
                queryEndpoints.editPlace,
                placeId,
            ]);

            const updatedPlace = {
                ...place,
                imageUrls: [...place.imageUrls, ...newImages.imageUrls],
            };

            queryClient.setQueryData(
                [queryEndpoints.editPlace, placeId],
                updatedPlace
            );

            queryClient.invalidateQueries([queryEndpoints.place, placeId]);
            
            queryClient.invalidateQueries([
                queryEndpoints.destination,
                destinationId,
            ]);

            queryClient.invalidateQueries([
                queryEndpoints.editDestination,
                destinationId,
            ]);
        },
    });

    return [mutate, error, isLoading];
};
