import { Route, Routes } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard/Dashboard';
import { OwnerDestinations } from '../pages/Dashboard/components/OwnerDestinations/OwnerDestinations';
import { UserSettings } from '../pages/Dashboard/components/UserSettings/UserSettings';
import { Followers } from '../pages/Dashboard/components/Followers/Followers';
import { History } from '../pages/Dashboard/components/History/History';
import { AddDestination } from '../pages/Dashboard/components/AddDestination/AddDestination';

import routeConstants from '../constants/routeConstants';

const { 
    ADD_DESTINATION, 
    MY_DESTINATIONS, 
    HISTORY, 
    SETTINGS, 
    FOLLOWERS 
} = routeConstants.DASHBOARD;

const UserDashboardRoutes = () => {
    return (
        <Routes>
            <Route element={<Dashboard />}>
                <Route index element={<p>Hello, Friend</p>} />
                <Route path={ADD_DESTINATION.route} element={<AddDestination />} />
                <Route path={MY_DESTINATIONS.route} element={<OwnerDestinations />} />
                <Route path={HISTORY.route} element={<History />} />
                <Route path={SETTINGS.route} element={<UserSettings />} />
                <Route path={FOLLOWERS.route} element={<Followers />} />
            </Route>
        </Routes>
    );
};

export default UserDashboardRoutes;
