import { useQueries } from '@tanstack/react-query';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';
import { getPlace, getPlaceComments } from '../../service/data/places';


export const usePlace = (placeId) => {
    const [place, comments] = useQueries({
        queries: [
            {
                queryKey: [queryEndpoints.places, placeId],
                queryFn: () => getPlace(placeId),
            },
            {
                queryKey: [queryEndpoints.placeComments, placeId],
                queryFn: () => getPlaceComments(placeId),
            },
        ],
    });

    return { place, comments };
};
