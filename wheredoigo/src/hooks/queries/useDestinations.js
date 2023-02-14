import { useQuery } from '@tanstack/react-query';
import { getDestinations } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useDestinations = () => {
    return useQuery({
        queryKey: [queryEndpoints.destinations],
        queryFn: getDestinations,
    });
};