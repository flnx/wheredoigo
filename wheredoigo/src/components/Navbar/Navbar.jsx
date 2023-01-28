import { useState, useEffect } from 'react';

// assets
import logo from '../../assets/logo/logo.png';
import { List } from 'phosphor-react';
import styles from './Navbar.module.css';

export const Navbar = () => {
    const [isNavToggled, setIsNavToggled] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        };
    });

    return (
        <header>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <a href="#">
                        <img src={logo} alt="logo" />
                    </a>
                    <button
                        className={styles.hamburger}
                        href="#"
                        onClick={() => setIsNavToggled(!isNavToggled)}
                    >
                        <List size="36" />
                    </button>
                </div>
                {(isNavToggled || screenWidth > 550) && (
                    <nav>
                        <ul className={styles.navbar}>
                            <li>
                                <a href="#">Discover</a>
                            </li>
                            <li>
                                <a href="#">Profile</a>
                            </li>
                            <li>
                                <a href="#">Login</a>
                            </li>
                            <li>
                                <a href="#">Register</a>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
};
