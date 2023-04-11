import { NavLink } from 'react-router-dom';
import { UserAvatar } from './UserAvatar';
import styles from './SideNavigation.module.css';

export const SideNavigation = () => {
    return (
        <div className={styles.sideNav}>
            <UserAvatar />
            <nav className={styles.navbar}>
                <NavLink to="add" className={styles.navLink}>
                    Add Destination
                </NavLink>
                <NavLink to="" className={styles.navLink}>
                    My Trips
                </NavLink>
                <NavLink to="followers" className={styles.navLink}>
                    Followers
                </NavLink>
                <NavLink to="history" className={styles.navLink}>
                    History
                </NavLink>
                <NavLink to="settings" className={styles.navLink}>
                    Settings
                </NavLink>
            </nav>
        </div>
    );
};

