import { useQuery } from '@tanstack/react-query';
import { getDestination } from '../../service/data/destinations';
import { queryEndpoint } from '../../utils/constants';

export const useDestination = (id) => {
    const { data, isLoading, error } = useQuery({
        queryKey: [queryEndpoint.destinations, id],
        queryFn: () => getDestination(id),
    });

    return { destination: data?.data, isLoading, error };
};
