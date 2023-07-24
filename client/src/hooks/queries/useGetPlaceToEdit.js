import { useQuery } from '@tanstack/react-query';
import { getPlaceToEdit } from 'src/service/data/permissions';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';

export const useGetPlaceToEdit = (placeId) => {
    const { data, error, isLoading } = useQuery({
        queryKey: [queryEndpoints.editPlace, placeId],
        queryFn: () => getPlaceToEdit(placeId),
    });

    return [data, error, isLoading];
};
