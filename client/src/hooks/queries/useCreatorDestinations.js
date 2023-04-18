import { useQuery } from '@tanstack/react-query';
import { getCreatorDestinations } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useDestinations = () => {
    return useQuery({
        queryKey: [queryEndpoints.creatorDestinations],
        queryFn: getCreatorDestinations,
    });
};