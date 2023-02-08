import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './utils/queryClient';

import './service/axiosConfig';

// Components
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Logout } from './components/Logout/Logout';
import { ProtectedRoute } from './components/ProtectedRoutes/ProtectedRoute';
import { UnauthenticatedRoute } from './components/UnauthenticatedRoute/UnauthenticatedRoute';

// Pages
import { Home } from './pages/Home/Home';
import { Discover } from './pages/Discover/Discover';
import { Login } from './pages/Authentication/Login';
import { Register } from './pages/Authentication/Register';
import { FormLayout } from './pages/Authentication/FormLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { AuthContextProvider } from './context/AuthContext';
import { DestinationDetails } from './pages/DestinationDetails/DestinationDetails';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
                <AuthContextProvider>
                    <div className="App">
                        <Navbar />
                        <main>
                            <Routes>
                                <Route element={<UnauthenticatedRoute />}>
                                    <Route
                                        path="/login"
                                        element={<FormLayout page={Login} />}
                                    />
                                    <Route
                                        path="/register"
                                        element={<FormLayout page={Register} />}
                                    />
                                </Route>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/discover"
                                    element={<Discover />}
                                />
                                <Route
                                    path="/destinations/:destinationId"
                                    element={<DestinationDetails />}
                                />
                                <Route
                                    path="/place/:placeId"
                                    element={<h1>Place</h1>}
                                />
                                <Route element={<ProtectedRoute />}>
                                    <Route
                                        path="/dashboard"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        path="/logout"
                                        element={<Logout />}
                                    />
                                </Route>
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </AuthContextProvider>
        </QueryClientProvider>
    );
}

export default App;
