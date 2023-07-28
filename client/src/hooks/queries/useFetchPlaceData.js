import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';
import { getPlacesCreatedByUser } from 'src/service/data/places';

export const useFetchPlacesData = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: [queryEndpoints.userPlacesData],
        queryFn: () => getPlacesCreatedByUser(),
        staleTime: 0.25 * (60 * 1000), // 15s min
        cacheTime: 0.20 * (60 * 1000), // 12s mins
    });

    const serverError = error?.message == 'Network Error' && error;

    return [data || [], isLoading, error, serverError];
};
