import { useQuery } from '@tanstack/react-query';
import { getPlaceToEdit } from '../../service/data/permissions';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useGetPlaceToEdit = (placeId) => {
    const { data, error, isLoading, isSuccess } = useQuery({
        queryKey: [queryEndpoints.editPlace, placeId],
        queryFn: () => getPlaceToEdit(placeId),
    });

    return [data, error, isLoading, isSuccess];
};