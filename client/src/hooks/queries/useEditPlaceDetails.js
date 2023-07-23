import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { editPlaceDetails } from '../../service/data/places';

export const useEditPlaceDetails = (placeId, destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => editPlaceDetails(placeId, data),
        onSuccess: (updatedField) => {
            const { infoId, description } = updatedField;

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

            const destination = queryClient.getQueryData([
                queryEndpoints.editDestination,
                destinationId,
            ]);

            if (destination) {
                const updatedDestination = {
                    ...destination,
                    places: destination.places.map((p) => {
                        if (p._id === placeId) {
                            return {
                                ...p,
                                [infoId]: description,
                            };
                        } else {
                            return p;
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
