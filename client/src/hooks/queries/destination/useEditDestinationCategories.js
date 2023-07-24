import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editDestinationCategories } from 'src/service/data/destinations';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';

export const useEditDestinationCategories = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => editDestinationCategories(destinationId, data),
        onSuccess: (updatedField) => {
            const { categories } = updatedField;

            const destination = queryClient.getQueryData([
                queryEndpoints.editDestination,
                destinationId,
            ]);

            const updatedDestination = {
                ...destination,
                category: categories,
            };

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
