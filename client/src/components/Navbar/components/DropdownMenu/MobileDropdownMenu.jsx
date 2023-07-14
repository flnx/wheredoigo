import { NavLink } from 'react-router-dom';

import routeConstants from '../../../../constants/routeConstants';
import styles from './MobileDropdownMenu.module.css';

const { DISCOVER, DASHBOARD, AUTH } = routeConstants;

export const MobileDropdownMenu = ({ auth }) => {
    return (
        <nav>
            <ul className={styles.navbar}>
                <Link to={DISCOVER.route}>{DISCOVER.name}</Link>
                {!auth.accessToken ? (
                    <>
                        <Link to={AUTH.LOGIN.routePath} className={styles.btn}>
                            {AUTH.LOGIN.name}
                        </Link>
                        <Link to={AUTH.REGISTER.routePath} className={styles.btn}>
                            {AUTH.REGISTER.name}
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to={DASHBOARD.route}>{DASHBOARD.name}</Link>
                        <Link to={AUTH.LOGOUT.route}>{AUTH.LOGOUT.name}</Link>
                    </>
                )}
            </ul>
        </nav>
    );
};

const Link = ({ children, to, className }) => {
    return (
        <li>
            <NavLink to={to} className={className}>
                {children}
            </NavLink>
        </li>
    );
};
