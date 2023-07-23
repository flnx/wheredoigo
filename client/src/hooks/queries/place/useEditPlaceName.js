import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../../constants/reactQueryEndpoints';
import { editPlaceName } from '../../../service/data/places';

export const useEditPlaceName = ({ placeId, destinationId }) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => editPlaceName(placeId, data),
        onSuccess: (updatedField) => {
            const { name } = updatedField;

            const place = queryClient.getQueryData([
                queryEndpoints.editPlace,
                placeId,
            ]);

            const updatedPlace = { ...place, name };

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
                    places: destination.places.map((p) => {
                        if (p._id === placeId) {
                            return {
                                ...p,
                                name,
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
