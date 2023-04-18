import { useQuery } from '@tanstack/react-query';
import { getCreatorDestinations } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useCreatorDestinations = () => {
    return useQuery({
        queryKey: [queryEndpoints.creatorDestinations],
        queryFn: getCreatorDestinations,
    });
};