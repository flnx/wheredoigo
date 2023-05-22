export const apiEndpoints = {
    login: '/login',
    register: '/register',
    logout: '/logout',

    allDestinations: 'destinations',
    creatorDestinations: 'destinations/created-by-user',
    destinationById: (id) => `destinations/${id}`,
    likeDestination: (id, path) => `destinations/${id}/${path}`,
    destinationsByPage: (searchParams, skip, categories) => {
        let url = `destinations?search=${searchParams}&page=${skip}`;

        if (categories) {
            const categoriesArray = categories.split(',');
            url += `&categories=${encodeURIComponent(
                JSON.stringify(categoriesArray)
            )}`;
        }

        return url;
    },
    addDestination: 'destinations',
    requestDestinationToEdit: (id) => `destinations/${id}/request-edit-permissions`,
    editDestinationDetails: (id) => `destinations/${id}/edit-destination-field`,
    deleteDestination: (id) => `destinations/${id}/delete`,
    addDestinationImages: (id) => `destinations/${id}/add-images`,
    deleteDestinationImage: (id) => `destinations/${id}/delete-image`,

    changeAvatar: 'change-avatar',
    getCity: 'destinations/get-city-data',

    places: `places`,
    placeById: (id) => `places/${id}`,
    placeComments: (id, page) => `places/${id}/comments?page=${page}`,
    addPlace: (destinationId) => `destinations/${destinationId}/places/add`,
    requestCreatePlacePermissions: (destinationId) =>
        `destinations/${destinationId}/places/add`,
    requestPlaceToEdit: (id) => `places/${id}/request-edit-permissions`,
    editPlaceDetails: (id) => `places/${id}/edit-place-field`,
    deletePlace: (id) => `places/${id}/delete`,
    addPlaceImages: (id) => `places/${id}/add-images`,
    deletePlaceImage: (id) => `places/${id}/delete-image`,

    deleteComment: (placeId, commentId) =>
        `places/${placeId}/comment?commentId=${commentId}`,
    addComment: (id) => `places/${id}/comment`,
};
