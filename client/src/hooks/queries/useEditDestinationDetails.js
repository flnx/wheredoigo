import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editDestinationDetails } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useEditDestinationDetails = () => {
    const queryClient = useQueryClient();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (data) => editDestinationDetails(data),
        onSuccess: () =>
            queryClient.invalidateQueries([
                queryEndpoints.destinations,
                queryEndpoints.creatorDestinations,
            ]),
    });

    return [mutate, error, isLoading];
};