import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// components
import { NavLinks } from './NavLinks/NavLinks';
import { HamburgerIconMenu } from './Hamburger-Icon/HamburgerIcon';

// assets
import logo from '../../assets/logo/logo.png';

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

    const hamburgerClickHandler = () => {
        setIsNavToggled(!isNavToggled);
    };

    const closeNavClickHandler = () => {
        setIsNavToggled(false);
    };

    const isMobile = screenWidth < 640;
    const desktopContainer = !isMobile && 'container';
    const mobileContainer = isMobile && 'container';

    return (
        <header>
            <div className={`${styles.flex} ${desktopContainer}`}>
                <div className={`${styles.wrapper} ${mobileContainer}`}>
                    <Link to="/" onClick={closeNavClickHandler}>
                        <img src={logo} alt="logo" />
                    </Link>
                    {isMobile && (
                        <HamburgerIconMenu
                            hamburgerClickHandler={hamburgerClickHandler}
                            isNavToggled={isNavToggled}
                        />
                    )}
                </div>
                {(isNavToggled || !isMobile) && (
                    <NavLinks closeNavHandler={closeNavClickHandler} />
                )}
            </div>
        </header>
    );
};
