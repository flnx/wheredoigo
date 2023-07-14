import { UnauthenticatedRoutesLinks } from '../RouteLinks/UnauthenticatedRoutesLinks';
import { AuthenticatedRouteLinks } from '../RouteLinks/AuthenticatedRouteLinks';

import styles from './DesktopDropdownMenu.module.css';

export const DesktopDropdownMenu = ({ auth, desktopDropdownRef }) => {
    return (
        <ul className={styles.navbar} ref={desktopDropdownRef}>
            {!auth.accessToken ? (
                <UnauthenticatedRoutesLinks />
            ) : (
                <>
                    <li className={styles.userContainer}>
                        <img
                            src={auth.avatarUrl}
                            alt={auth.username}
                            className={styles.avatar}
                        />
                        <div className={styles.userContent}>
                            <span className={styles.username}>
                                @{auth.username}
                            </span>
                        </div>
                    </li>
                    <AuthenticatedRouteLinks />
                </>
            )}
        </ul>
    );
};
