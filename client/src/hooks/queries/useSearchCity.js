import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getCityData } from '../../service/data/destinations';

export const useSearchCity = (city, dispatchHandler) => {
    const { isSuccess, isFetching, error } = useQuery({
        queryKey: [queryEndpoints.city, city],
        queryFn: () => getCityData(city),
        onSuccess: (result) => {
            dispatchHandler({
                type: 'last_city_fetched',
                payload: { city: result.name, country: result.country },
            });
        },
        onError: () => {
            dispatchHandler({ type: 'reset_last_fetch' });
        },
        enabled: !!city,
        staleTime: 0,
        cacheTime: 0,
    });

    return [isSuccess, isFetching, error];
};
