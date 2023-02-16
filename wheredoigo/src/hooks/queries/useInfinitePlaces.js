import { useInfiniteQuery } from '@tanstack/react-query';
import { getPlacesPaginated } from '../../service/data/places';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useInfinitePlaces = () => {
    return useInfiniteQuery({
        queryKey: [queryEndpoints.places, 'infinite'],
        getNextPageParam: (_lasttPage, pages) => {
            const skip = pages.length;
            const currentPageArray = pages[skip - 1];
            const nextPage = skip * 6;

            return currentPageArray.length == 6 ? nextPage : undefined;
        },
        queryFn: getPlacesPaginated,
    });
};
