import { NavLink } from 'react-router-dom';
import styles from '../Navbar.module.css';

export const NavLinks = ({ closeNavHandler }) => {
    return (
        <nav>
            <ul className={styles.navbar}>
                <li>
                    <NavLink to="/discover" onClick={closeNavHandler}>
                        Discover
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" onClick={closeNavHandler}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login" onClick={closeNavHandler} className={styles.btn}>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register" onClick={closeNavHandler} className={styles.btn}>
                        Register
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
