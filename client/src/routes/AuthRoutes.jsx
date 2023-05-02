import { Route, Routes } from 'react-router-dom';

import routeConstants from '../constants/routeConstants';
import { Login, Register } from '../pages/Authentication/FormLayout';

const { AUTH } = routeConstants;

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path={AUTH.LOGIN.route} element={<Login />} />
            <Route path={AUTH.REGISTER.route} element={<Register />} />
        </Routes>
    );
};
