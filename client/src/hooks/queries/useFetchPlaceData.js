import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getUserPlacesData } from '../../service/data/places';

export const useFetchPlacesData = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: [queryEndpoints.userPlacesData],
        queryFn: () => getUserPlacesData(),
        staleTime: 0,
        cacheTime: 0
    });

    return [data || [], isLoading, error];
};
