import { Route, Routes } from 'react-router-dom';

import { FormLayout } from '../pages/Authentication/FormLayout';
import { Login } from '../pages/Authentication/Login';
import { Register } from '../pages/Authentication/Register';

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<FormLayout page={Login} />} />
            <Route path="/register" element={<FormLayout page={Register} />} />
        </Routes>
    );
};

export default AuthRoutes;
