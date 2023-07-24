import { useQuery } from '@tanstack/react-query';
import { getCreatorDestinations } from 'src/service/data/destinations';
import { queryEndpoints } from 'src/constants/reactQueryEndpoints';

export const useCreatorDestinations = () => {
    return useQuery({
        queryKey: [queryEndpoints.creatorDestinations],
        queryFn: getCreatorDestinations,
        useErrorBoundary: (error) => error.response?.status >= 500,
    });
};
