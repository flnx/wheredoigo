import { createPointer } from "../utils/apiDataPointer"
import { encodeData } from "../utils/utils"

export const apiEndpoints = {
    destinationPlaces: (id) => 'classes/Place?where=' + encodeData({ destination: createPointer('Destination', id) }),
    placeById: () => `classes/Place/${id}`,
    allDestinations: 'classes/Destination',
    destinationById: (id) => `classes/Destination/${id}`
}