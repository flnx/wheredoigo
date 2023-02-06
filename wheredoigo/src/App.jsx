import { Routes, Route } from 'react-router-dom';
import './service/axiosConfig';

// Components
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';

// Pages
import { Home } from './pages/Home/Home';
import { Discover } from './pages/Discover/Discover';
import { Login } from './pages/Authentication/Login';
import { Register } from './pages/Authentication/Register';
import { FormLayout } from './pages/Authentication/FormLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { AuthContextProvider } from './context/AuthContext';

function App() {
    return (
        <AuthContextProvider>
            <div className="App">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/login"
                            element={<FormLayout page={Login} />}
                        />
                        <Route
                            path="/register"
                            element={<FormLayout page={Register} />}
                        />
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </AuthContextProvider>
    );
}

export default App;
