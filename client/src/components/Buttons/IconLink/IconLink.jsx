import { NavLink, useLocation } from 'react-router-dom';

import styles from './IconLink.module.css';

export const IconLink = ({ children, Icon, to }) => {
    const location = useLocation();
    const path = to;

    const isActive = (activePath) => {
        return location.pathname === activePath ? styles.activeLink : '';
    };

    const activeClass = isActive(path);

    return (
        <NavLink to={path} className={`${styles.navLink} ${activeClass}`}>
            <div className={styles.iconFlex}>
                <Icon size={26} weight={activeClass ? 'fill' : 'regular'} />
                <span className={styles.navText}>{children}</span>
            </div>
        </NavLink>
    );
};