import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

// components
import { NavLinks } from './NavLinks/NavLinks';
import { HamburgerIconMenu } from './Hamburger-Icon/HamburgerIcon';

// assets
import logo from '../../assets/logo/logo.png';

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

    const hamburgerClickHandler = () => {
        setIsNavToggled(!isNavToggled);
    };

    return (
        <header>
            <div className={styles.container}>
                <div className={`${styles.wrapper} container`}>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    {screenWidth < 640 && (
                        <HamburgerIconMenu
                            hamburgerClickHandler={hamburgerClickHandler}
                            isNavToggled={isNavToggled}
                        />
                    )}
                </div>
                {(isNavToggled || screenWidth > 640) && <NavLinks />}
            </div>
        </header>
    );
};
