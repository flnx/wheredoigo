import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getUserLastActivities } from '../../service/data/user';

export const useUserActivity = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: [queryEndpoints.userActivity],
        queryFn: () => getUserLastActivities(),
    });

    return [data, isLoading, error];
};
