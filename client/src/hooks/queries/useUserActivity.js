import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getUserLastActivities } from '../../service/data/user';

export const useUserActivity = () => {
    return useQuery({
        queryKey: [queryEndpoints.userActivity],
        queryFn: () => getUserLastActivities(),
    });
};