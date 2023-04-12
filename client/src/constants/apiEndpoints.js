export const apiEndpoints = {
    changeAvatar: 'change-avatar',
    addDestination: 'destinations',
    addPlace: 'places',
    addComment: (id) => `places/${id}/comment`,
    allDestinations: 'destinations',
    getCity: 'destinations/get-city-data',
    placeById: (id) => `places/${id}`,
    destinationById: (id) => `destinations/${id}`,
    destinationsByPage: (searchParams, skip) => `destinations?search=${searchParams}&page=${skip}`,
}