import { Routes, Route } from 'react-router-dom';
import './styles/App.css';

// components
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home/Home';

function App() {
    return (
        <div className="App">
                <header>
                    <Navbar />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>
            </div>
    );
}

export default App;
