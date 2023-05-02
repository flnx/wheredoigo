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
        },
        MY_DESTINATIONS: {
            name: 'My Destinations',
            route: '/my-destinations',
        },
        FOLLOWERS: {
            name: 'Followers',
            route: '/followers',
        },
        HISTORY: {
            name: 'History',
            route: '/history',
        },
        SETTINGS: {
            name: 'Settings',
            route: '/settings',
        },
    },
    DESTINATIONS: {
        name: 'Destinations',
        route: '/destinations',
        BY_ID: {
            route: '/destinations/:destinationId',
        },
        EDIT: {
            route: '/destinations/:destinationId/edit',
        },
        INFO: {
            route: '/info'
        }
    },
    PLACES: {
        name: 'Places',
        route: '/places',
        BY_ID: {
            route: '/places/:placeId'
        },
        ADD: {
            name: 'Add Place',
            route: '/destinations/:destinationId/places/add',
        },
        EDIT: {
            name: 'Edit',
            route: '/places/:placeId/edit',
        },
    }
});
