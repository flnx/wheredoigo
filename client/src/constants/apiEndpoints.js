export const apiEndpoints = {
    destination: {
        byId: (id) => `destinations/${id}`,
        editRequest: (id) => `destinations/${id}/request-edit-permissions`,
        editDescription: (id) => `destinations/${id}/description`,
        editDetails: (id) => `destinations/${id}/details`,
        editCategories: (id) => `destinations/${id}/categories`,
        like: (id, path) => `destinations/${id}/${path}`, // The path can be "like" or "dislike"
        deleteImage: (id) => `destinations/${id}/delete-image`,
        addImages: (id) => `destinations/${id}/add-images`,
        search: (searchParams, skip = 0, categories) => {
            let url = `destinations?search=${searchParams}&page=${skip}`;

            if (categories) {
                const categoriesArray = categories.split(',');
                const encoded = encodeURIComponent(JSON.stringify(categoriesArray));

                url += `&categories=${encoded}`;
            }

            return url;
        },
        top: 'destinations/top',
        add: 'destinations',
        creator: 'destinations/created-by-user',
        delete: (id) => `destinations/${id}/delete`,
    },

    user: {
        register: '/register',
        login: '/login',
        logout: '/logout',
        avatar: 'user/avatar',
        delete: 'user/delete',
        activities: 'user/activities',
        favorites: 'user/favorites',
    },

    place: {
        editDescription: (id) => `places/${id}/description`,
        editType: (id) => `places/${id}/type`,
        editName: (id) => `places/${id}/name`,
        create: (destinationId) => `destinations/${destinationId}/places/add`,
    },

    countriesAndCities: 'destinations/countries-and-cities',

    topPlaces: `top-places`,
    userPlacesData: 'places/user-places-data',
    placeById: (id) => `places/${id}`,
    placeComments: (id, page) => `places/${id}/comments?page=${page}`,
    generateAIComments: (id) => `places/${id}/generate-ai-comments`,
    requestCreatePlacePermissions: (destinationId) =>
        `destinations/${destinationId}/places/add`,
    requestPlaceToEdit: (id) => `places/${id}/request-edit-permissions`,
    deletePlace: (id) => `places/${id}/delete`,
    addPlaceImages: (id) => `places/${id}/add-images`,
    deletePlaceImage: (id) => `places/${id}/delete-image`,
    deleteComment: (placeId, commentId) =>
        `places/${placeId}/comment?commentId=${commentId}`,
    addComment: (id) => `places/${id}/comment`,
};
