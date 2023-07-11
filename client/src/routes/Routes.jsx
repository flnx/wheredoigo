import { Routes, Route } from 'react-router-dom';

import { UserDashboardRoutes } from '../routes/UserDashboardRoutes';
import { AuthRoutes } from '../routes/AuthRoutes';
import { UnauthenticatedRoute } from '../components/UnauthenticatedRoute/UnauthenticatedRoute';

import { ProtectedRoute } from '../components/ProtectedRoutes/ProtectedRoute';
import { Home } from '../pages/Home/Home';
import { Discover } from '../pages/Discover/Discover';
import { DestinationDetails } from '../pages/DestinationDetails/DestinationDetails';
import { DetailsModal } from '../components/DetailsModal/DetailsModal';
import { PlaceDetails } from '../pages/PlaceDetails/PlaceDetails';
import { AddPlace } from '../pages/AddPlace/AddPlace';
import { EditDestination } from '../pages/EditDestination/EditDestination';
import { EditPlace } from '../pages/EditPlace/EditPlace';
import { Logout } from '../components/Logout/Logout';
import { NotFound } from '../components/Errors/NotFound/NotFound';

import routeConstants from '../constants/routeConstants';

const { HOME, AUTH, DASHBOARD, DESTINATIONS, PLACES, DISCOVER } = routeConstants;

export const AppRoutes = () => {
    return (
        <main>
            <Routes>
                <Route path={HOME.route} element={<Home />} />
                <Route element={<UnauthenticatedRoute />}>
                    <Route path={`${AUTH.route}/*`} element={<AuthRoutes />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path={`${DASHBOARD.route}/*`} element={<UserDashboardRoutes />} />
                    <Route path={DESTINATIONS.EDIT.route} element={<EditDestination />} />
                    <Route path={PLACES.EDIT.route} element={<EditPlace />} />
                    <Route path={PLACES.ADD.route} element={<AddPlace />} />
                    <Route path={AUTH.LOGOUT.route} element={<Logout />} />
                </Route>
                <Route path={DISCOVER.route} element={<Discover />} />
                <Route path={DESTINATIONS.BY_ID.route} element={<DestinationDetails />}>
                    <Route path={DESTINATIONS.INFO.route} element={<DetailsModal />} />
                    <Route path={DESTINATIONS.OVERVIEW.route} element={<DetailsModal />} />
                </Route>
                <Route path={PLACES.BY_ID.route} element={<PlaceDetails />}>
                    <Route path={PLACES.ABOUT.route} element={<DetailsModal />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    );
};
