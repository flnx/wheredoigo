import { useContext } from 'react';

// Auth Context
import { AuthContext } from 'src/context/AuthContext';

import { UnauthenticatedRoutesLinks } from '../RouteLinks/UnauthenticatedRoutesLinks';
import { Link } from '../RouteLinks/Link';

import routeConstants from 'src/constants/routeConstants';
import styles from './NavLinksDesktop.module.css';

export const NavLinksDesktop = () => {
    const { auth } = useContext(AuthContext);
    const { DISCOVER, DASHBOARD } = routeConstants;

    const isAuthenticated = auth.accessToken;

    return (
        <nav>
            <ul
                className={styles.navbar}
                style={{
                    gap: isAuthenticated ? '3rem' : '1.25rem',
                }}
            >
                <Link to={DISCOVER.route} className={styles.btn}>
                    {DISCOVER.name}
                </Link>
                {!isAuthenticated ? (
                    <UnauthenticatedRoutesLinks />
                ) : (
                    <Link to={DASHBOARD.route} className={styles.btn}>
                        {DASHBOARD.name}
                    </Link>
                )}
            </ul>
        </nav>
    );
};
