import { createPointer } from "../utils/apiDataPointer"
import { encodeData } from "../utils/utils"

export const apiEndpoints = {
    destinationPlaces: (id) => 'classes/Place?where=' + encodeData({ destination: createPointer('Destination', id) }),
    placeById: (id) => `classes/Place/${id}`,
    allDestinations: 'classes/Destination',
    destinationById: (id) => `classes/Destination/${id}`,
    placesByPage: (skip) => `classes/Place?skip=${skip}&limit=6`
}