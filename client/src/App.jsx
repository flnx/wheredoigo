// Components
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { AxiosInterceptor } from './service/Axios';

// Pages
import { AuthContextProvider } from './context/AuthContext';

import { AppRoutes } from './routes/AppRoutes';
import { useScrollToTop } from './hooks/useScrollTop';

function App() {
    useScrollToTop();

    return (
        <AuthContextProvider>
            <AxiosInterceptor>
                <div className="App">
                    <Navbar />
                    <AppRoutes />
                    <Footer />
                </div>
            </AxiosInterceptor>
        </AuthContextProvider>
    );
}

export default App;
