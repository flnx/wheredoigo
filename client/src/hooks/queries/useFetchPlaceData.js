import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getUserPlacesData } from '../../service/data/places';

export const useFetchPlacesData = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: [queryEndpoints.userPlacesData],
        queryFn: () => getUserPlacesData(),
        staleTime: 0.25 * (60 * 1000), // 15s min
        cacheTime: 0.20 * (60 * 1000), // 12s mins
    });

    return [data || [], isLoading, error];
};
