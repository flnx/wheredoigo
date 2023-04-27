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

function App() {
    return (
            <AuthContextProvider>
                <AxiosInterceptor>
                    <div className="App">
                        <Navbar />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route element={<UnauthenticatedRoute />}>
                                    <Route path="/auth/*" element={<AuthRoutes />} />
                                </Route>
                                <Route element={<ProtectedRoute />}>
                                    <Route path="/dashboard/*" element={<UserDashboardRoutes />} />
                                    <Route path="/destinations/:destinationId/edit" element={<EditDestination />}/>
                                    <Route path="/places/:placeId/edit" element={<EditPlace />}/>
                                    <Route path="/destinations/:destinationId/places/add" element={<AddPlace />} />
                                </Route>
                                <Route path="/discover" element={<Discover />} />
                                <Route path="/destinations/:destinationId" element={<DestinationDetails />}>
                                    <Route path="info" element={<DetailsModal />} />
                                </Route>
                                <Route path="/places/:placeId" element={<PlaceDetails />} />
                                <Route path="*" element={<p>404 Not Found</p>} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </AxiosInterceptor>
            </AuthContextProvider>
    );
}

export default App;
