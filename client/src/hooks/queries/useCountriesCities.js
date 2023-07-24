import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';
import { getCountriesAndCities } from 'src/service/data/destinations';

export const useCountriesCities = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: [queryEndpoints.locations],
        queryFn: () => getCountriesAndCities(),
        staleTime: 15 * 1000, // 15 seconds
        cacheTime: 20 * 1000, // 20 seconds
    });

    return [data, isLoading, error];
};
