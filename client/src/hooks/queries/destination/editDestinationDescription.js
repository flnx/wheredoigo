import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editDestinationDescription } from 'src/service/data/destinations';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';

export const useEditDestinationDescription = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => editDestinationDescription(destinationId, data),
        onSuccess: (updatedField) => {
            const { description } = updatedField;

            const destination = queryClient.getQueryData([
                queryEndpoints.editDestination,
                destinationId,
            ]);

            const updatedDestination = {
                ...destination,
                description,
            };

            queryClient.setQueryData(
                [queryEndpoints.editDestination, destinationId],
                updatedDestination
            );

            queryClient.invalidateQueries([
                queryEndpoints.destination,
                destinationId,
            ]);
        },
    });

    return [mutate, isLoading];
};