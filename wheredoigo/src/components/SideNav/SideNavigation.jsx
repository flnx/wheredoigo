import styles from './SideNavigation.module.css';
import { NavLink } from 'react-router-dom';

export const SideNavigation = () => {
    return (
      <aside className={styles.sideNav}>
        <nav className={styles.navbar}>
            <NavLink to="#" className={styles.navLink}>Favorites</NavLink>
            <NavLink to="#" className={styles.navLink}>My Trips</NavLink>
            <NavLink to="#" className={styles.navLink}>Completed</NavLink>
            <NavLink to="#" className={styles.navLink}>Completed</NavLink>
        </nav>
      </aside>
    );
};
