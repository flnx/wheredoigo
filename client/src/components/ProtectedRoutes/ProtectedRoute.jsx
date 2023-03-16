import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);

    if (!auth.accessToken) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};
