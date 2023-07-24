import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';
import { getUserLastActivities } from 'src/service/data/user';

export const useUserActivity = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: [queryEndpoints.userActivity],
        queryFn: () => getUserLastActivities(),
    });

    return [data, isLoading, error];
};
