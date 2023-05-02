import { Routes, Route } from 'react-router-dom';

import UserDashboardRoutes from './routes/UserDashboardRoutes';
import AuthRoutes from './routes/AuthRoutes';

// Components
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { UnauthenticatedRoute } from './components/UnauthenticatedRoute/UnauthenticatedRoute';
import { ProtectedRoute } from './components/ProtectedRoutes/ProtectedRoute';
import { AxiosInterceptor } from './service/Axios';

// Pages
import { Home } from './pages/Home/Home';
import { Discover } from './pages/Discover/Discover';
import { AuthContextProvider } from './context/AuthContext';
import { DestinationDetails } from './pages/DestinationDetails/DestinationDetails';
import { DetailsModal } from './components/DetailsModal/DetailsModal';
import { PlaceDetails } from './pages/PlaceDetails/PlaceDetails';
import { AddPlace } from './pages/AddPlace/AddPlace';
import { EditDestination } from './pages/EditDestination/EditDestination';
import { EditPlace } from './pages/EditPlace/EditPlace';
import { Logout } from './components/Logout/Logout';

import routeConstants from './constants/routeConstants';

const { HOME, AUTH, DASHBOARD, DESTINATIONS, PLACES, DISCOVER } = routeConstants;

function App() {
    return (
        <AuthContextProvider>
            <AxiosInterceptor>
                <div className="App">
                    <Navbar />
                    <main>
                        <Routes>
                            <Route 
                                path={HOME.route} 
                                element={<Home />} 
                            />
                            <Route element={<UnauthenticatedRoute />}>
                                <Route 
                                    path={`${AUTH.route}/*`} 
                                    element={<AuthRoutes />} 
                                />
                            </Route>
                            <Route element={<ProtectedRoute />}>
                                <Route
                                    path={`${DASHBOARD.route}/*`}
                                    element={<UserDashboardRoutes />}
                                />
                                <Route
                                    path={DESTINATIONS.EDIT.route}
                                    element={<EditDestination />}
                                />
                                <Route 
                                    path={PLACES.EDIT.route} 
                                    element={<EditPlace />} 
                                />
                                <Route 
                                    path={PLACES.ADD.route} 
                                    element={<AddPlace />} 
                                />
                                <Route 
                                    path={AUTH.LOGOUT.route} 
                                    element={<Logout />} 
                                />
                            </Route>
                            <Route 
                                path={DISCOVER.route} 
                                element={<Discover />} 
                            />
                            <Route path={DESTINATIONS.BY_ID.route} element={<DestinationDetails />}>
                                <Route 
                                    path={DESTINATIONS.INFO.route}
                                    element={<DetailsModal />} 
                                />
                            </Route>
                            <Route 
                                path={PLACES.BY_ID.route} 
                                element={<PlaceDetails />} 
                            />
                            <Route 
                                path="*" 
                                element={<p>404 Not Found</p>} 
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AxiosInterceptor>
        </AuthContextProvider>
    );
}

export default App;
