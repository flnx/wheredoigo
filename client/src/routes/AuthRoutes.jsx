import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import routeConstants from '../constants/routeConstants';
import { DarkOverlay } from '../components/DarkOverlay/DarkOverlay';

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
                        <Login />
                    </Suspense>
                }
            />
            <Route
                path={AUTH.REGISTER.route}
                element={
                    <Suspense fallback={<DarkOverlay isLoading={true} />}>
                        <Register />
                    </Suspense>
                }
            />
        </Routes>
    );
};
