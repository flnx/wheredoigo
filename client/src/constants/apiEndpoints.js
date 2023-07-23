export const apiEndpoints = {
    destination: {
        editDescription: (id) => `destinations/${id}/description`,
        editDetails: (id) => `destinations/${id}/details`,
        editCategories: (id) => `destinations/${id}/categories`,
    },

    user: {

    },

    place: {
        editDescription: (id) => `places/${id}/description`,
        editType: (id) => `places/${id}/type`,
    },

    login: '/login',
    register: '/register',
    logout: '/logout',
    userLastActivities: 'user/last-activities',
    deleteAccount: 'user/delete',
    userFavorites: 'user/favorites',

    allDestinations: 'destinations',
    mostLikedDestinations: 'top-destinations',
    creatorDestinations: 'destinations/created-by-user',
    destinationById: (id) => `destinations/${id}`,
    // the path can be "like" or "dislike"
    likeDestination: (id, path) => `http://localhost:3000/destinations/${id}/${path}`,
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
    editDestinationDescription: (id) => `destinations/${id}/description`,
    deleteDestination: (id) => `destinations/${id}/delete`,
    addDestinationImages: (id) => `destinations/${id}/add-images`,
    deleteDestinationImage: (id) => `destinations/${id}/delete-image`,

    changeAvatar: 'change-avatar',
    countriesAndCities: 'destinations/countries-and-cities',

    topPlaces: `top-places`,
    userPlacesData: 'places/user-places-data',
    placeById: (id) => `places/${id}`,
    placeComments: (id, page) => `places/${id}/comments?page=${page}`,
    generateAIComments: (id) => `places/${id}/generate-ai-comments`,
    addPlace: (destinationId) => `destinations/${destinationId}/places/add`,
    requestCreatePlacePermissions: (destinationId) => `destinations/${destinationId}/places/add`,
    requestPlaceToEdit: (id) => `places/${id}/request-edit-permissions`,
    deletePlace: (id) => `places/${id}/delete`,
    addPlaceImages: (id) => `places/${id}/add-images`,
    deletePlaceImage: (id) => `places/${id}/delete-image`,

    deleteComment: (placeId, commentId) => `places/${placeId}/comment?commentId=${commentId}`,
    addComment: (id) => `places/${id}/comment`,
};
