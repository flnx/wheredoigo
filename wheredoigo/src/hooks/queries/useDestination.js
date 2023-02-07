import { useQuery } from '@tanstack/react-query';
import { getDestination } from '../../service/data/destinations';
import { queryEndpoint } from '../../utils/constants';

export const useDestination = (id) => {
    return useQuery({
        queryKey: [queryEndpoint.destinations, id],
        queryFn: () => getDestination(id),
    });
};
