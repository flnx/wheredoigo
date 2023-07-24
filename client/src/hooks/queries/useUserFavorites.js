import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';
import { getUserFavorites } from 'src/service/data/user';

export const useUserFavorites = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: [queryEndpoints.userFavorites],
        queryFn: getUserFavorites,
    });

    return [data, isLoading, error];
};
