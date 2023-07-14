import { UnauthenticatedRoutesLinks } from '../RouteLinks/UnauthenticatedRoutesLinks';
import { AuthenticatedRouteLinks } from '../RouteLinks/AuthenticatedRouteLinks';
import { Link } from '../RouteLinks/Link';

import routeConstants from '../../../../constants/routeConstants';
import styles from './DesktopDropdownMenu.module.css';

const { DISCOVER } = routeConstants;

export const DesktopDropdownMenu = ({ auth }) => {

    return (
        <ul className={styles.navbar}>
            <Link to={DISCOVER.route}>{DISCOVER.name}</Link>

            {!auth.accessToken 
                ? <UnauthenticatedRoutesLinks /> 
                : <AuthenticatedRouteLinks />
            }
        </ul>
    );
};
