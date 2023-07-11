import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DarkOverlay } from '../components/DarkOverlay/DarkOverlay';
import { ErrorBoundaryFallback as ErrorBoundary } from '../components/Errors/ErrorFallbackComponent';

import routeConstants from '../constants/routeConstants';

const Login = React.lazy(() => import('../pages/Authentication/Login/Login'));
const Register = React.lazy(() => import('../pages/Authentication/Register/Register'));

export const AuthRoutes = () => {
    const { AUTH } = routeConstants;

    return (
        <Routes>
            <Route
                path={AUTH.LOGIN.route}
                element={
                    <Suspense fallback={<DarkOverlay isLoading={true} />}>
                        <ErrorBoundary key={AUTH.LOGIN.name}>
                            <Login />
                        </ErrorBoundary>
                    </Suspense>
                }
            />
            <Route
                path={AUTH.REGISTER.route}
                element={
                    <Suspense fallback={<DarkOverlay isLoading={true} />}>
                        <ErrorBoundary key={AUTH.REGISTER.name}>
                            <Register />
                        </ErrorBoundary>
                    </Suspense>
                }
            />
        </Routes>
    );
};
