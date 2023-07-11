import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Routes
import ProtectedRoute from '../components/ProtectedRoutes/ProtectedRoute';
import UnauthenticatedRoute from '../components/UnauthenticatedRoute/UnauthenticatedRoute';

// Lazy Routes
import AuthRoutes from './AuthRoutes'; // lazy component
const UserDashboardRoutes = lazy(() => import('./UserDashboardRoutes'));
const CreatorActionsRoutes = lazy(() => import('./CreatorActionsRoutes'));

// Components
import { DarkOverlay } from '../components/DarkOverlay/DarkOverlay';
import { ErrorBoundaryFallback as ErrorBoundary } from '../components/Errors/ErrorFallbackComponent';
import { DetailsModal } from '../components/DetailsModal/DetailsModal';
import { NotFound } from '../components/Errors/NotFound/NotFound';
import { Logout } from '../components/Logout/Logout';

// Pages
import { Home } from '../pages/Home/Home';
import { Discover } from '../pages/Discover/Discover';
import { DestinationDetails } from '../pages/DestinationDetails/DestinationDetails';
import { PlaceDetails } from '../pages/PlaceDetails/PlaceDetails';

// Constants
import routeConstants from '../constants/routeConstants';

const { HOME, AUTH, DASHBOARD, DESTINATIONS, PLACES, DISCOVER } = routeConstants;

export const AppRoutes = () => {
    return (
        <main>
            <Routes>
                {/* -- HOME -- */}
                <Route
                    path={HOME.route}
                    element={
                        <ErrorBoundary key={routeConstants.HOME.name}>
                            <Home />
                        </ErrorBoundary>
                    }
                />

                {/* -- LOGIN / REGISTER -- */}
                <Route element={<UnauthenticatedRoute />}>
                    <Route path={`${AUTH.route}/*`} element={<AuthRoutes />} />
                </Route>

                {/* -- PROTECTED Routes -- */}
                <Route
                    element={
                        <ErrorBoundary key={'protected'}>
                            <ProtectedRoute />
                        </ErrorBoundary>
                    }
                >
                    {/* 1. Protected: Dashboard -- */}
                    <Route
                        path={`${DASHBOARD.route}/*`}
                        element={
                            <Suspense fallback={<DarkOverlay isLoading={true} />}>
                                <UserDashboardRoutes />
                            </Suspense>
                        }
                    />

                    {/* 2. Protected: Add Place, Edit Place, Edit Destination */}
                    <Route
                        path={'*'}
                        element={
                            <Suspense fallback={<DarkOverlay isLoading={true} text={'Loading'}/>}>
                                <CreatorActionsRoutes />
                            </Suspense>
                        }
                    />

                    {/* 3. Protected: Logout */}
                    <Route path={AUTH.LOGOUT.route} element={<Logout />} />
                </Route>

                {/* -- DISCOVER -- */}
                <Route
                    path={DISCOVER.route}
                    element={
                        <ErrorBoundary key={DISCOVER.name}>
                            <Discover />
                        </ErrorBoundary>
                    }
                />

                {/* -- DESTINATION Details -- */}
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

                {/* -- PLACE Details -- */}
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

                {/* -- Not Found -- */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    );
};
