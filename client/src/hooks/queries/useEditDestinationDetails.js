import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editDestinationDetails } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useEditDestinationDetails = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => editDestinationDetails(destinationId, data),
        onSuccess: (updatedField) => {
            const { categoryId, infoId, description, categories } = updatedField;

            const destination = queryClient.getQueryData([
                queryEndpoints.editDestination,
                destinationId,
            ]);

            let updatedDestination;

            if (categories) {
                // Update category
                updatedDestination = {
                    ...destination,
                    category: categories,
                };
            } else {
                updatedDestination =
                    infoId === 'Description'
                        ? { ...destination, description }
                        : {
                              ...destination,
                              details: destination.details.map((detail) =>
                                  detail._id == categoryId
                                      ? { ...detail, content: description }
                                      : detail
                              ),
                          };
            }

            queryClient.setQueryData(
                [queryEndpoints.editDestination, destinationId],
                updatedDestination
            );

            queryClient.invalidateQueries([
                queryEndpoints.destination,
                destinationId,
            ]);

            queryClient.invalidateQueries([queryEndpoints.creatorDestinations]);
        },
    });

    return [mutate, isLoading];
};
