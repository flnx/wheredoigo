import styles from './SideNavigation.module.css';
import { NavLink } from 'react-router-dom';

// TO DO: Add Icons

export const SideNavigation = () => {
    return (
        <div className={styles.sideNav}>
            <header className={styles.userInfo}>
                <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="user image" />
                <h2>Jessica Alba</h2>
                <p>JessicaA@yahoo.com</p>
            </header>

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
