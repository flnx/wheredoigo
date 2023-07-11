import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Routes
import AuthRoutes from './AuthRoutes';
import ProtectedRoute from '../components/ProtectedRoutes/ProtectedRoute';
import UnauthenticatedRoute from '../components/UnauthenticatedRoute/UnauthenticatedRoute';

// Lazy Routes
const UserDashboardRoutes = lazy(() => import('./UserDashboardRoutes'));
const CreatorActionsRoutes = lazy(() => import('./CreatorActionsRoutes'));


// Components
import { DarkOverlay } from '../components/DarkOverlay/DarkOverlay';
import { ErrorBoundaryFallback as ErrorBoundary } from '../components/Errors/ErrorFallbackComponent';
import { Home } from '../pages/Home/Home';
import { Discover } from '../pages/Discover/Discover';
import { DestinationDetails } from '../pages/DestinationDetails/DestinationDetails';
import { Logout } from '../components/Logout/Logout';
import { DetailsModal } from '../components/DetailsModal/DetailsModal';
import { PlaceDetails } from '../pages/PlaceDetails/PlaceDetails';
import { NotFound } from '../components/Errors/NotFound/NotFound';

import routeConstants from '../constants/routeConstants';

const { HOME, AUTH, DASHBOARD, DESTINATIONS, PLACES, DISCOVER } = routeConstants;

export const AppRoutes = () => {
    return (
        <main>
            <Routes>
                {/* Home */}
                <Route
                    path={HOME.route}
                    element={
                        <ErrorBoundary key={routeConstants.HOME.name}>
                            <Home />
                        </ErrorBoundary>
                    }
                />

                {/* Login / Register */}
                <Route element={<UnauthenticatedRoute />}>
                    <Route path={`${AUTH.route}/*`} element={<AuthRoutes />} />
                </Route>

                {/* Protected Routes:  */}
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

                    {/* Add Place, Edit Place, Edit Destination */}
                    <Route
                        path={'*'}
                        element={
                            <Suspense fallback={<DarkOverlay isLoading={true} />}>
                                <CreatorActionsRoutes />
                            </Suspense>
                        }
                    />

                    {/* Logout */}
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
