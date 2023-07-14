import { Link } from './Link';

import routeConstants from '../../../../constants/routeConstants';
const { DASHBOARD, AUTH } = routeConstants;

export const AuthenticatedRouteLinks = () => {
    return (
        <>
            <Link to={DASHBOARD.route}>{DASHBOARD.name}</Link>
            <Link to={AUTH.LOGOUT.route}>{AUTH.LOGOUT.name}</Link>
        </>
    );
};
