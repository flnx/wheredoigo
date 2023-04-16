import { NavLink } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';
import styles from './SideNavigation.module.css';

const getNavLinkClass = ({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`;

export const SideNavigation = () => {
    return (
        <div className={styles.sideNav}>
            <UserAvatar />
            <nav className={styles.navbar}>
                <NavLink to="add" className={getNavLinkClass}>
                    Add Destination
                </NavLink>
                <NavLink to="my-trips" className={getNavLinkClass}>
                    My Trips
                </NavLink>
                <NavLink to="followers" className={getNavLinkClass}>
                    Followers
                </NavLink>
                <NavLink to="history" className={getNavLinkClass}>
                    History
                </NavLink>
                <NavLink to="settings" className={getNavLinkClass}>
                    Settings
                </NavLink>
            </nav>
        </div>
    );
};
