import { NavLink, useLocation } from 'react-router-dom';

import styles from './IconLink.module.css';

export const IconLink = ({ children, Icon, to, className }) => {
    const location = useLocation();
    const path = to;

    const isActive = (activePath) => {
        return location.pathname === activePath ? styles.activeLink : '';
    };

    const activeClass = isActive(path);

    const customizedClass = className ? className : '';

    return (
        <NavLink 
            to={path} 
            className={`${styles.navLink} ${activeClass}`}>
                <div className={styles.iconFlex}>
                    <Icon size={26} weight={activeClass ? 'fill' : 'regular'} />
                    <span className={`${styles.navText} ${customizedClass}`}>
                        {children}
                    </span>
                </div>
        </NavLink>
    );
};
