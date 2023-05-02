import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import routeConstants from '../../constants/routeConstants';

const { HOME } = routeConstants;

export const UnauthenticatedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);

    if (auth.accessToken) {
        return <Navigate to={HOME.route} replace />;
    }

    return children ? children : <Outlet />;
};
