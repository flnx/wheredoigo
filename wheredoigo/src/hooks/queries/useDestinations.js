import { useQuery } from '@tanstack/react-query';
import { getDestinations } from '../../service/data/destinations';
import { queryEndpoint } from '../../utils/constants';

export const useDestinations = () => {
    return useQuery({
        queryKey: queryEndpoint.destinations,
        queryFn: getDestinations,
    });
};