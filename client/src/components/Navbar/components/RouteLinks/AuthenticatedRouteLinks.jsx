import { Link } from './Link';

import routeConstants from '../../../../constants/routeConstants';
const { DASHBOARD, AUTH } = routeConstants;

export const AuthenticatedRouteLinks = () => {
    return (
        <>
            <Link to={DASHBOARD.route}>{DASHBOARD.name}</Link>
            <Link to={DASHBOARD.ADD_DESTINATION.routePath}>
                {DASHBOARD.ADD_DESTINATION.name}
            </Link>
            <Link to={DASHBOARD.MY_DESTINATIONS.routePath}>
                {DASHBOARD.MY_DESTINATIONS.name}
            </Link>
            <Link to={DASHBOARD.SETTINGS.routePath}>
                {DASHBOARD.SETTINGS.name}
            </Link>
            <Link to={AUTH.LOGOUT.route}>{AUTH.LOGOUT.name}</Link>
        </>
    );
};
