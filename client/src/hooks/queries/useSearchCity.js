import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getCityData } from '../../service/data/destinations';

export const useSearchCity = (city, updateLastCityFetch) => {
    const { isSuccess, isFetching, error } = useQuery({
        queryKey: [queryEndpoints.city, city],
        queryFn: () => getCityData(city),
        onSuccess: (result) => {
            updateLastCityFetch(result.name, result.country);
        },
        onError: () => {
            updateLastCityFetch('', '');
        },
        enabled: !!city,
        staleTime: 0,
        cacheTime: 0,
    });

    return [isSuccess, isFetching, error];
};
