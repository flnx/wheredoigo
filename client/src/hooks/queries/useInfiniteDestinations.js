import { useInfiniteQuery } from '@tanstack/react-query';

import { getDestinationsPaginated } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useInfiniteDestinations = (searchParams, categoryParams) => {
    return useInfiniteQuery({
        queryKey: [
            queryEndpoints.destinations,
            'infinite',
            searchParams,
            categoryParams,
        ],
        getNextPageParam: (_lastPage, pages) => {
            const skip = pages.length;
            const currentPageArray = pages[skip - 1];
            const isThereNextPage = currentPageArray.length == 9;
            const nextPage = skip * 9;

            return isThereNextPage ? nextPage : undefined;
        },
        queryFn: getDestinationsPaginated,
        cacheTime: 0,
    });
};
