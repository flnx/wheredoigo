// Components
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { AxiosInterceptor } from './service/Axios';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallbackComponent } from './components/Errors/ErrorFallbackComponent';

// Pages
import { AuthContextProvider } from './context/AuthContext';

import { AppRoutes } from './routes/Routes';
import { useScrollToTop } from './hooks/useScrollTop';

function App() {
    useScrollToTop();

    return (
        <AuthContextProvider>
            <AxiosInterceptor>
                <div className="App">
                    <Navbar />
                    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
                        <AppRoutes />
                    </ErrorBoundary>
                    <Footer />
                </div>
            </AxiosInterceptor>
        </AuthContextProvider>
    );
}

export default App;
