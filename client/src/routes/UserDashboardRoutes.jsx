import { Route, Routes } from 'react-router-dom';
import routeConstants from '../constants/routeConstants';

// Dashboard route
import { Dashboard } from '../pages/Dashboard/Dashboard';

// Dashboard sub-routes
import { OwnerDestinations } from '../pages/Dashboard/sub-pages/OwnerDestinations/OwnerDestinations';
import { UserSettings } from '../pages/Dashboard/sub-pages/UserSettings/UserSettings';
import { History } from '../pages/Dashboard/sub-pages/History/History';
import { Main } from '../pages/Dashboard/sub-pages/Main/Main';
import { AddDestination } from '../pages/Dashboard/sub-pages/AddDestination/AddDestination';

export const UserDashboardRoutes = () => {
    const { ADD_DESTINATION, MY_DESTINATIONS, HISTORY, SETTINGS } = routeConstants.DASHBOARD;

    return (
        <Routes>
            <Route element={<Dashboard />}>
                <Route index element={<Main />} />
                <Route path={ADD_DESTINATION.route} element={<AddDestination />} />
                <Route path={MY_DESTINATIONS.route} element={<OwnerDestinations />} />
                <Route path={HISTORY.route} element={<History />} />
                <Route path={SETTINGS.route} element={<UserSettings />} />
            </Route>
        </Routes>
    );
};
