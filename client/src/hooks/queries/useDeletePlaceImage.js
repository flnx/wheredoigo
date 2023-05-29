import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { deletePlaceImage } from '../../service/data/places';

export const useDeletePlaceImage = (placeId, destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, error } = useMutation({
        mutationFn: (imageId) => deletePlaceImage(placeId, imageId),

        onSuccess: (imageData) => {
            const { imgId } = imageData;

            const place = queryClient.getQueryData([
                queryEndpoints.editPlace,
                placeId,
            ]);

            const updatePlace = {
                ...place,
                imageUrls: place.imageUrls.filter((x) => x._id !== imgId),
            };

            queryClient.setQueryData(
                [queryEndpoints.editPlace, placeId],
                updatePlace
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
