import { createPointer } from "../utils/apiDataPointer"
import { encodeData } from "../utils/utils"

export const apiEndpoints = {
    addDestination: 'destinations',
    addComment: 'classes/Comment',
    allDestinations: 'destinations',
    getCity: 'destinations/get-city-data',
    placeById: (id) => `places/${id}`,
    destinationById: (id) => `destinations/${id}`,
    destinationsByPage: (searchParams, skip) => `destinations?search=${searchParams}&skip=${skip}`,
    placeComments: (id) => 'comments?where=' + encodeData({ placeId: createPointer('Place', id) }),
    searchPlacesByCountry: (params) => 'classes/Place?where=' + encodeData({country: {$regex: `^${params}`}}),
}

// destinations?where=skip=${skip}&limit=6'