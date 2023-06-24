import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getCountriesAndCities } from '../../service/data/destinations';

export const useCountriesCities = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: [queryEndpoints.locations],
        queryFn: () => getCountriesAndCities(),
        staleTime: 0,
        cacheTime: 0,
    });

    return [data, isLoading, error];
};
