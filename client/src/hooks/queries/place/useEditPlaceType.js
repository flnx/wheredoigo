import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../../constants/reactQueryEndpoints';
import { editPlaceType } from '../../../service/data/places';

export const useEditPlaceType = ({ placeId, destinationId }) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => editPlaceType(placeId, data),
        onSuccess: (updatedField) => {
            const { type } = updatedField;

            const place = queryClient.getQueryData([
                queryEndpoints.editPlace,
                placeId,
            ]);

            const updatedPlace = { ...place, type };

            queryClient.setQueryData(
                [queryEndpoints.editPlace, placeId],
                updatedPlace
            );

            const destination = queryClient.getQueryData([
                queryEndpoints.editDestination,
                destinationId,
            ]);

            // This works without this if but during testing it throws bcs of cachcing

            if (destination) {
                const updatedDestination = {
                    ...destination,
                    places: destination.places.map((place) => {
                        if (place._id === placeId) {
                            return {
                                ...place,
                                type,
                            };
                        } else {
                            return place;
                        }
                    }),
                };

                queryClient.setQueriesData(
                    [queryEndpoints.editDestination, destinationId],
                    updatedDestination
                );
            }

            queryClient.invalidateQueries([queryEndpoints.places]);

            queryClient.invalidateQueries([
                queryEndpoints.destination,
                destinationId,
            ]);
        },
    });

    return [mutate, isLoading];
};
