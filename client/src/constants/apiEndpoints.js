export const apiEndpoints = {
    changeAvatar: 'change-avatar',
    addDestination: 'destinations',
    addPlace: 'places',
    addComment: (id) => `places/${id}/comment`,
    deleteComment: (placeId, commentId) => `places/${placeId}/comment?commentId=${commentId}`,
    allDestinations: 'destinations',
    getCity: 'destinations/get-city-data',
    creatorDestinations: 'destinations/created-by-user',
    placeById: (id) => `places/${id}`,
    destinationById: (id) => `destinations/${id}`,
    destinationsByPage: (searchParams, skip) => `destinations?search=${searchParams}&page=${skip}`,
    requestCreatePlacePermissions: (id) => `places/${id}/add-place`,
    requestEditDestinationPermissions: (id) => `destinations/${id}/request-edit-permissions`,
    editDestinationDetails: (id) => `destinations/${id}/edit-destination-field`,
    deleteDestinationImage: (id) => `destinations/${id}/delete-image`,
    addDestinationImages: (id) => `destinations/${id}/add-images`
}