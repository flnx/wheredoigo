import { UnauthenticatedRoutesLinks } from '../RouteLinks/UnauthenticatedRoutesLinks';
import { AuthenticatedRouteLinks } from '../RouteLinks/AuthenticatedRouteLinks';
import { Link } from '../RouteLinks/Link';

import routeConstants from '../../../../constants/routeConstants';
import styles from './DesktopDropdownMenu.module.css';

const { DISCOVER } = routeConstants;

export const DesktopDropdownMenu = ({ auth, desktopDropdownRef }) => {
    return (
        <ul className={styles.navbar} ref={desktopDropdownRef}>
            {!auth.accessToken 
                ? <UnauthenticatedRoutesLinks /> 
                : <AuthenticatedRouteLinks />
            }
        </ul>
    );
};
