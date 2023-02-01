import { NavLink } from 'react-router-dom';
import styles from '../Navbar.module.css';

export const NavLinks = ({ hamburgerClickHandler }) => {
    const closeMenuOnRedirectHandler = () => {
        hamburgerClickHandler();
    };

    return (
        <nav>
            <ul className={styles.navbar}>
                <li>
                    <NavLink to="/discover" onClick={closeMenuOnRedirectHandler}>
                        Discover
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" onClick={closeMenuOnRedirectHandler}>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login" onClick={closeMenuOnRedirectHandler}>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register" onClick={closeMenuOnRedirectHandler}>
                        Register
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
