export const apiEndpoints = {
    allDestinations: 'destinations',
    creatorDestinations: 'destinations/created-by-user',
    destinationById: (id) => `destinations/${id}`,
    destinationsByPage: (searchParams, skip) => `destinations?search=${searchParams}&page=${skip}`,
    addDestination: 'destinations',
    addDestinationImages: (id) => `destinations/${id}/add-images`,
    requestDestinationToEdit: (id) => `destinations/${id}/request-edit-permissions`,
    editDestinationDetails: (id) => `destinations/${id}/edit-destination-field`,
    deleteDestinationImage: (id) => `destinations/${id}/delete-image`,
    deleteDestination: (id) => `destinations/${id}/delete`,
    
    changeAvatar: 'change-avatar',
    getCity: 'destinations/get-city-data',
    
    placeById: (id) => `places/${id}`,
    addPlace: (destinationId) => `destinations/${destinationId}/places/add`,
    requestCreatePlacePermissions: (destinationId) => `destinations/${destinationId}/places/add`,
    requestPlaceToEdit: (id) => `places/${id}/request-edit-permissions`,
    editPlaceDetails: (id) => `places/${id}/edit-place-field`,
    deletePlace: (id) => `places/${id}/delete`,

    deleteComment: (placeId, commentId) => `places/${placeId}/comment?commentId=${commentId}`,
    addComment: (id) => `places/${id}/comment`,
}