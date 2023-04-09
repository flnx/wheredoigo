import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './utils/queryClient';

import UserDashboardRoutes from './routes/UserDashboardRoutes';
import AuthRoutes from './routes/AuthRoutes';

import './service/axiosConfig';

// Components
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { UnauthenticatedRoute } from './components/UnauthenticatedRoute/UnauthenticatedRoute';
import { ProtectedRoute } from './components/ProtectedRoutes/ProtectedRoute';

// Pages
import { Home } from './pages/Home/Home';
import { Discover } from './pages/Discover/Discover';
import { AuthContextProvider } from './context/AuthContext';
import { DestinationDetails } from './pages/DestinationDetails/DestinationDetails';
import { DetailsModal } from './components/DetailsModal/DetailsModal';
import { PlaceDetails } from './pages/PlaceDetails/PlaceDetails';
import { AddPlace } from './pages/AddPlace/AddPlace';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <AuthContextProvider>
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
                            </Route>

                            <Route path="/discover" element={<Discover />} />
                            <Route
                                path="/destinations/:destinationId"
                                element={<DestinationDetails />}
                            >
                                <Route path="info" element={<DetailsModal />} />
                            </Route>
                            <Route
                                path="/destinations/:destinationId/add-place"
                                element={<AddPlace />}
                            />
                            <Route path="/places/:placeId" element={<PlaceDetails />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthContextProvider>
        </QueryClientProvider>
    );
}

export default App;
