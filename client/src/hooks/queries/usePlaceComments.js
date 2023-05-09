import { useQuery } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getPlaceComments } from '../../service/data/places';

export const usePlaceComments = (placeId, page) => {
    const { data, error, isLoading, isPreviousData, isFetching } = useQuery({
        queryKey: [queryEndpoints.placeComments, page],
        queryFn: () => getPlaceComments(placeId, page),
        keepPreviousData: true,
    });

    return [data, error, isLoading, isPreviousData, isFetching];
};
