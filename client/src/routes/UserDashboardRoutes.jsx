import { Route, Routes } from 'react-router-dom';
import routeConstants from '../constants/routeConstants';

// Dashboard route
import { Dashboard } from '../pages/Dashboard/Dashboard';

// Dashboard sub-routes
import { OwnerDestinations } from '../pages/Dashboard/sub-pages/OwnerDestinations/OwnerDestinations';
import { UserSettings } from '../pages/Dashboard/sub-pages/UserSettings/UserSettings';
import { Favorites } from '../pages/Dashboard/sub-pages/Favorites/Favorites';
import { Main } from '../pages/Dashboard/sub-pages/Main/Main';
import { AddDestination } from '../pages/Dashboard/sub-pages/AddDestination/AddDestination';
import NotFound from '../components/Errors/NotFound/NotFound';

export const UserDashboardRoutes = () => {
    const { ADD_DESTINATION, MY_DESTINATIONS, FAVORITES, SETTINGS } = routeConstants.DASHBOARD;

    return (
        <Routes>
            <Route element={<Dashboard />}>
                <Route index element={<Main />} />
                <Route path={ADD_DESTINATION.route} element={<AddDestination />} />
                <Route path={MY_DESTINATIONS.route} element={<OwnerDestinations />} />
                <Route path={FAVORITES.route} element={<Favorites />} />
                <Route path={SETTINGS.route} element={<UserSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default UserDashboardRoutes;
