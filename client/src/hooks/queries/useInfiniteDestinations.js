import { useInfiniteQuery } from '@tanstack/react-query';

import { getDestinationsPaginated } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useInfiniteDestinations = (searchParams) => {
    return useInfiniteQuery({
        queryKey: [queryEndpoints.destinations, 'infinite', searchParams],
        getNextPageParam: (_lastPage, pages) => {
            console.log(pages)
            const skip = pages.length;
            const currentPageArray = pages[skip - 1];
            const isThereNextPage = currentPageArray.length == 6;
            const nextPage = skip * 6;

            return isThereNextPage ? nextPage : undefined;
        },
        queryFn: getDestinationsPaginated,
        cacheTime: 0,
    });
};
