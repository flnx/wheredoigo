import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from 'src/context/AuthContext';
import routeConstants from 'src/constants/routeConstants';

const { HOME } = routeConstants;

const UnauthenticatedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);

    if (auth.accessToken) {
        return <Navigate to={HOME.route} replace />;
    }

    return children ? children : <Outlet />;
};

export default UnauthenticatedRoute;
