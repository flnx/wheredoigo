import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editDestinationDetails } from '../../../service/data/destinations';
import { queryEndpoints } from '../../../constants/reactQueryEndpoints';

export const useEditDestinationDetails = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => editDestinationDetails(destinationId, data),
        onSuccess: (updatedField) => {
            const { detail_id, description } = updatedField;

            const destination = queryClient.getQueryData([
                queryEndpoints.editDestination,
                destinationId,
            ]);

            const updatedDestination = {
                ...destination,
                details: destination.details.map((detail) =>
                    detail._id == detail_id
                        ? { ...detail, content: description }
                        : detail
                ),
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
