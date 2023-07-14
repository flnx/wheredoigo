import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { UnauthenticatedRoutesLinks } from '../RouteLinks/UnauthenticatedRoutesLinks';
import { Link } from '../RouteLinks/Link';

import routeConstants from '../../../../constants/routeConstants';

import styles from './NavLinksDesktop.module.css';

const { DISCOVER, DASHBOARD, AUTH } = routeConstants;

export const NavLinksDesktop = () => {
    const { auth } = useContext(AuthContext);

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
