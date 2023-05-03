export default Object.freeze({
    HOME: {
        name: 'Home',
        route: '/',
    },
    AUTH: {
        route: '/auth',
        LOGIN: {
            name: 'Login',
            route: '/login',
            routePath: '/auth/login',
        },
        REGISTER: {
            name: 'Sign Up',
            route: '/register',
            routePath: '/auth/register',
        },
        LOGOUT: {
            name: 'Logout',
            route: '/logout',
        },
    },
    DISCOVER: {
        name: 'Discover',
        route: '/discover',
    },
    DASHBOARD: {
        name: 'Dashboard',
        route: '/dashboard',

        ADD_DESTINATION: {
            name: 'Add Destination',
            route: '/add',
            routePath: '/dashboard/add',
        },
        MY_DESTINATIONS: {
            name: 'My Destinations',
            route: '/my-destinations',
            routePath: '/dashboard/my-destinations',
        },
        FOLLOWERS: {
            name: 'Followers',
            route: '/followers',
            routePath: '/dashboard/followers',
        },
        HISTORY: {
            name: 'History',
            route: '/history',
            routePath: '/dashboard/history',
        },
        SETTINGS: {
            name: 'Settings',
            route: '/settings',
            routePath: '/dashboard/settings',
        },
    },
    DESTINATIONS: {
        name: 'Destinations',
        route: '/destinations',
        BY_ID: {
            route: '/destinations/:destinationId',
            routePath: (destinationId) => `/destinations/${destinationId}`,
        },
        EDIT: {
            route: '/destinations/:destinationId/edit',
            routePath: (destinationId) => `/destinations/${destinationId}/edit`,
        },
        INFO: {
            route: 'info',
        },
        OVERVIEW: {
            name: 'Overview',
            route: 'overview'
        }
    },
    PLACES: {
        name: 'Places',
        route: '/places',
        BY_ID: {
            route: '/places/:placeId',
            routePath: (placeId) => `/places/${placeId}`,
        },
        ADD: {
            name: 'Add More Places',
            route: '/destinations/:destinationId/places/add',
            routePath: (destinationId) => `/destinations/${destinationId}/places/add`,
        },
        EDIT: {
            name: 'Edit',
            route: '/places/:placeId/edit',
            routePath: (placeId) => `/places/${placeId}/edit`,
        },
        ABOUT: {
            name: 'About',
            route: 'about',
        }
    },
});
