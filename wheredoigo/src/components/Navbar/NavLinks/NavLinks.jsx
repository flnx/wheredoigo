import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

import styles from '../Navbar.module.css';

export const NavLinks = ({ closeNavHandler }) => {
    const { auth } = useContext(AuthContext);

    return (
        <nav>
            <ul className={styles.navbar}>
                <li>
                    <NavLink to="/discover" onClick={closeNavHandler}>
                        Discover
                    </NavLink>
                </li>

                {!auth.accessToken ? (
                    <>
                        <li>
                            <NavLink
                                to="/login"
                                onClick={closeNavHandler}
                                className={styles.btn}
                            >
                                Log in
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/register"
                                onClick={closeNavHandler}
                                className={styles.btn}
                            >
                                Sign up
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/dashboard" onClick={closeNavHandler}>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/logout" onClick={closeNavHandler}>
                                Logout
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};
