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
                <NavLink to="#" className={styles.navLink}>
                    Favorites
                </NavLink>
                <NavLink to="#" className={styles.navLink}>
                    My Trips
                </NavLink>
                <NavLink to="#" className={styles.navLink}>
                    Completed
                </NavLink>
                <NavLink to="#" className={styles.navLink}>
                    Completed
                </NavLink>
            </nav>
        </div>
    );
};
