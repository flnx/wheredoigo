import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const UnauthenticatedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);

    
    if (auth.accessToken) {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};
