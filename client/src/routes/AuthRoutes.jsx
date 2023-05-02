import { Route, Routes } from 'react-router-dom';

import { FormLayout } from '../pages/Authentication/FormLayout';
import { Login } from '../pages/Authentication/Login';
import { Register } from '../pages/Authentication/Register';

import routeConstants from '../constants/routeConstants';

const { AUTH } = routeConstants;

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route 
                path={AUTH.LOGIN.route} 
                element={<FormLayout page={Login} />} 
            />
            <Route 
                path={AUTH.REGISTER.route} 
                element={<FormLayout page={Register} />} 
            />
        </Routes>
    );
};