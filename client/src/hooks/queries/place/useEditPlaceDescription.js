import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';
import { editPlaceDescription } from 'src/service/data/places';

export const useEditPlaceDescription = (placeId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => editPlaceDescription(placeId, data),
        onSuccess: (updatedField) => {
            const { description } = updatedField;

            const place = queryClient.getQueryData([
                queryEndpoints.editPlace,
                placeId,
            ]);

            const updatedPlace = {
                ...place,
                description,
            };

            queryClient.setQueryData(
                [queryEndpoints.editPlace, placeId],
                updatedPlace
            );

            queryClient.invalidateQueries(
                [queryEndpoints.place, placeId]
            );
        },
    });

    return [mutate, isLoading];
};
