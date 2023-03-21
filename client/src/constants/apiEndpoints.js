import { createPointer } from "../utils/apiDataPointer"
import { encodeData } from "../utils/utils"

export const apiEndpoints = {
    destinationPlaces: (id) => {
        return 'classes/Place?where=' + encodeData({ destination: createPointer('Destination', id) });
    },
    placeById: (id) => `places/${id}`,
    allDestinations: 'destinations',
    destinationById: (id) => `destinations/${id}`,
    destinationsByPage: (searchParams, skip) => {
        return 'destinations?where=' + encodeData({country: {$regex: `^${searchParams}`}}) + `&skip=${skip}&limit=6`
    },
    placeComments: (id) => {
        return 'commens?where=' + encodeData({ placeId: createPointer('Place', id) })
    },
    addComment: 'classes/Comment',
    searchPlacesByCountry: (params) => 'classes/Place?where=' + encodeData({country: {$regex: `^${params}`}})
}

// destinations?where=skip=${skip}&limit=6'