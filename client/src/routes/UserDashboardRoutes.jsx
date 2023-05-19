import { Route, Routes } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard/Dashboard';
import { OwnerDestinations } from '../pages/Dashboard/components/OwnerDestinations/OwnerDestinations';
import { UserSettings } from '../pages/Dashboard/components/UserSettings/UserSettings';
import { History } from '../pages/Dashboard/components/History/History';
import { AddDestination } from '../pages/Dashboard/components/AddDestination/AddDestination';
import { Main } from '../pages/Dashboard/components/Main/Main';

import routeConstants from '../constants/routeConstants';

const { ADD_DESTINATION, MY_DESTINATIONS, HISTORY, SETTINGS } = routeConstants.DASHBOARD;

export const UserDashboardRoutes = () => {
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
