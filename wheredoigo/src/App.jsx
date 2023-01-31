import { Routes, Route } from 'react-router-dom';
import './styles/App.css';

// components
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Authentication/Login';
import { Register } from './pages/Authentication/Register';
import { FormLayout } from './pages/Authentication/FormLayout';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<FormLayout page={Login} />} />
                <Route path="/register" element={<FormLayout page={Register} />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
