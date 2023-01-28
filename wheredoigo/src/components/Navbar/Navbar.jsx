import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

// components
import { NavLinks } from './NavLinks';

// assets
import logo from '../../assets/logo/logo.png';
import { List, X } from 'phosphor-react';

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
        <div className={styles.container}>
            <div className={`${styles.wrapper} container`}>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <button
                    className={styles.hamburger}
                    onClick={() => setIsNavToggled(!isNavToggled)}
                >
                    {isNavToggled 
                        ? <X size={36} /> 
                        : <List size={36} />
                    }
                </button>
            </div>
            {(isNavToggled || screenWidth > 640) && (
                <nav>
                    <NavLinks />
                </nav>
            )}
        </div>
    );
};
