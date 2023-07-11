import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { AuthRoutes } from '../routes/AuthRoutes';
import { UnauthenticatedRoute } from '../components/UnauthenticatedRoute/UnauthenticatedRoute';
const UserDashboardRoutes = lazy(() => import('./UserDashboardRoutes'));

import { ErrorBoundaryFallback as ErrorBoundary } from '../components/Errors/ErrorFallbackComponent';
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
import { DarkOverlay } from '../components/DarkOverlay/DarkOverlay';

const { HOME, AUTH, DASHBOARD, DESTINATIONS, PLACES, DISCOVER } = routeConstants;

export const AppRoutes = () => {
    return (
        <main>
            <Routes>
                <Route
                    path={HOME.route}
                    element={
                        <ErrorBoundary key={routeConstants.HOME.name}>
                            <Home />
                        </ErrorBoundary>
                    }
                />
                <Route element={<UnauthenticatedRoute />}>
                    <Route path={`${AUTH.route}/*`} element={<AuthRoutes />} />
                </Route>
                <Route
                    element={
                        <ErrorBoundary key={'protected'}>
                            <ProtectedRoute />
                        </ErrorBoundary>
                    }
                >
                    <Route
                        path={`${DASHBOARD.route}/*`}
                        element={
                            <Suspense fallback={<DarkOverlay isLoading={true} />}>
                                <UserDashboardRoutes />
                            </Suspense>
                        }
                    />
                    <Route path={DESTINATIONS.EDIT.route} element={<EditDestination />} />
                    <Route path={PLACES.EDIT.route} element={<EditPlace />} />
                    <Route path={PLACES.ADD.route} element={<AddPlace />} />
                    <Route path={AUTH.LOGOUT.route} element={<Logout />} />
                </Route>
                <Route
                    path={DISCOVER.route}
                    element={
                        <ErrorBoundary key={DISCOVER.name}>
                            <Discover />
                        </ErrorBoundary>
                    }
                />
                <Route
                    path={DESTINATIONS.BY_ID.route}
                    element={
                        <ErrorBoundary key={DESTINATIONS.name}>
                            <DestinationDetails />
                        </ErrorBoundary>
                    }
                >
                    <Route path={DESTINATIONS.INFO.route} element={<DetailsModal />} />
                    <Route path={DESTINATIONS.OVERVIEW.route} element={<DetailsModal />} />
                </Route>
                <Route
                    path={PLACES.BY_ID.route}
                    element={
                        <ErrorBoundary key={PLACES.name}>
                            <PlaceDetails />
                        </ErrorBoundary>
                    }
                >
                    <Route path={PLACES.ABOUT.route} element={<DetailsModal />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    );
};
