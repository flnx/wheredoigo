import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { editPlaceDetails } from '../../service/data/places';

export const useEditPlaceDetails = (placeId) => {
    const queryClient = useQueryClient();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (data) => editPlaceDetails(placeId, data),
        onSuccess: (updatedField) => {
            const { infoId, description, destinationId } = updatedField;

            const place = queryClient.getQueryData([
                queryEndpoints.editPlace,
                placeId,
            ]);

            const updatedPlace = {
                ...place,
                [infoId]: description,
            };

            queryClient.setQueryData(
                [queryEndpoints.editPlace, placeId],
                updatedPlace
            );

            queryClient.invalidateQueries([
                queryEndpoints.editDestination,
                destinationId,
            ]);

            queryClient.invalidateQueries([
                queryEndpoints.destination,
                destinationId,
            ]);
        },
    });

    return [mutate, error, isLoading];
};
