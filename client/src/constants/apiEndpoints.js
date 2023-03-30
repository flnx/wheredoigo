import { createPointer } from "../utils/apiDataPointer"
import { encodeData } from "../utils/utils"

export const apiEndpoints = {
    placeById: (id) => `places/${id}`,
    allDestinations: 'destinations',
    destinationById: (id) => `destinations/${id}`,
    destinationsByPage: (searchParams, skip) => `destinations?search=${searchParams}&skip=${skip}`,
    placeComments: (id) => {
        return 'comments?where=' + encodeData({ placeId: createPointer('Place', id) })
    },
    addComment: 'classes/Comment',
    searchPlacesByCountry: (params) => 'classes/Place?where=' + encodeData({country: {$regex: `^${params}`}}),
    getCity: 'destinations/get-city-data'
}

// destinations?where=skip=${skip}&limit=6'