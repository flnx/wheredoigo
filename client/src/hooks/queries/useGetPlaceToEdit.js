import { useQuery } from '@tanstack/react-query';
import { getPlaceToEdit } from '../../service/data/permissions';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useGetPlaceToEdit = (placeId) => {
    const { data, error, isLoading } = useQuery({
        queryKey: [queryEndpoints.editPlace, placeId],
        queryFn: () => getPlaceToEdit(placeId),
    });

    const serverError = error?.message == 'Network Error' && error;

    return [data, error, isLoading, serverError];
};