import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from 'src/context/AuthContext';
import routeConstants from 'src/constants/routeConstants';

const { LOGIN } = routeConstants.AUTH;

const ProtectedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);

    if (!auth.accessToken) {
        return <Navigate to={LOGIN.routePath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
