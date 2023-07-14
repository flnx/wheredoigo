import { UnauthenticatedRoutesLinks } from '../RouteLinks/UnauthenticatedRoutesLinks';
import { AuthenticatedRouteLinks } from '../RouteLinks/AuthenticatedRouteLinks';
import { UserDropdownIntro } from './UserDropdownIntro';

import styles from './DesktopDropdownMenu.module.css';

export const DesktopDropdownMenu = ({ auth, desktopDropdownRef }) => {
    return (
        <ul className={styles.navbar} ref={desktopDropdownRef}>
            {!auth.accessToken ? (
                <UnauthenticatedRoutesLinks />
            ) : (
                <>
                    <UserDropdownIntro auth={auth}/>
                    <AuthenticatedRouteLinks />
                </>
            )}
        </ul>
    );
};
