import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export const NavLinks = () => {
    return (
        <>
            <ul className={styles.navbar}>
                <li>
                    <NavLink to="/discover">Discover</NavLink>
                </li>
                <li>
                    <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
            </ul>
        </>
    );
};
