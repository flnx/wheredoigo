import { createPointer } from "../utils/apiDataPointer"
import { encodeData } from "../utils/utils"

export const apiEndpoints = {
    destinationPlaces: (id) => {
        return 'classes/Place?where=' + encodeData({ destination: createPointer('Destination', id) });
    },
    placeById: (id) => `classes/Place/${id}`,
    allDestinations: 'classes/Destination',
    destinationById: (id) => `classes/Destination/${id}`,
    destinationsByPage: (searchParams, skip) => {
        return 'classes/Destination?where=' + encodeData({country: {$regex: `^${searchParams}`}}) + `&skip=${skip}&limit=6`
    },
    placeComments: (id) => {
        return 'classes/Comment?where=' + encodeData({ placeId: createPointer('Place', id) })
    },
    addComment: 'classes/Comment',
    searchPlacesByCountry: (params) => 'classes/Place?where=' + encodeData({country: {$regex: `^${params}`}})
}