import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { createPlace } from '../../service/data/places';

export const useAddNewPlace = () => {
    const queryClient = useQueryClient();

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (data) => createPlace(data),
        onSuccess: () => queryClient.invalidateQueries([queryEndpoints.places]),
    });

    return [mutate, error, isLoading];
};
