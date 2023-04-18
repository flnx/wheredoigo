import { NavLink } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';
import styles from './SideNavigation.module.css';

const getNavLinkClass = ({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`;

export const SideNavigation = () => {
    return (
        <div className={styles.sideNav}>
            <UserAvatar />
            <nav className={styles.navbar}>
                <NavLink end to="/dashboard" className={getNavLinkClass}>
                    Dashboard
                </NavLink>
                <NavLink to="add" className={getNavLinkClass}>
                    Add Destination
                </NavLink>
                <NavLink to="destinations-created-by-user" className={getNavLinkClass}>
                    Created Destinations
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
