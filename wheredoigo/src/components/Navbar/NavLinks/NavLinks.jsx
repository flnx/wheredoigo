import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

import styles from '../Navbar.module.css';

export const NavLinks = ({ closeNavHandler }) => {
    const { auth } = useContext(AuthContext);

    console.log(auth.accessToken);

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
                {!auth.accessToken && (
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
                )}
            </ul>
        </nav>
    );
};
