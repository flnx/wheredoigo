import { useQuery } from '@tanstack/react-query';
import { getDestination } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useDestination = (destinationId) => {
    const destination = useQuery({
        queryKey: [queryEndpoints.destination, destinationId],
        queryFn: () => getDestination(destinationId),
    });

    return destination;
};