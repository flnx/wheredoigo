import { useInfiniteQuery } from '@tanstack/react-query';

import { getDestinationsPaginated } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useInfiniteDestinations = (searchParams, categoryParams) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        error,
        refetch
    } = useInfiniteQuery({
        queryKey: [
            queryEndpoints.destinations,
            'infinite',
            searchParams,
            categoryParams,
        ],
        getNextPageParam: (data) => data.nextPage,
        queryFn: getDestinationsPaginated,
        cacheTime: 0,
        keepPreviousData: true,
    });

    const serverError = error?.message == 'Network Error' && error;

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        error,
        serverError,
        refetch
    };
};
