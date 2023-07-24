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

    return (
        <nav>
            <ul className={styles.navbar}>
                <Link to={DISCOVER.route} className={styles.btn}>
                    {DISCOVER.name}
                </Link>
                {!auth.accessToken ? (
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
