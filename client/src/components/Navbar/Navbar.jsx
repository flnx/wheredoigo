import { useState, useEffect } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Link, useLocation } from 'react-router-dom';

// components
import { NavLinks } from './NavLinks/NavLinks';
import { HamburgerIconMenu } from './Hamburger-Icon/HamburgerIcon';

// assets
import logo from '../../assets/logo/logo.png';
import routeConstants from '../../constants/routeConstants';
import styles from './Navbar.module.css';

const { HOME } = routeConstants;

export const Navbar = () => {
    const [isNavToggled, setIsNavToggled] = useState(false);
    const screenWidth = useWindowSize();

    const location = useLocation();

    useEffect(() => {
        setIsNavToggled(false);
    }, [location]);

    const hamburgerClickHandler = () => {
        setIsNavToggled(!isNavToggled);
    };

    const isMobile = screenWidth < 640;
    const desktopContainer = !isMobile && styles.container;
    const mobileContainer = isMobile && styles.container;

    return (
        <header>
            <div className={`${styles.flex} ${desktopContainer}`}>
                <div className={`${styles.wrapper} ${mobileContainer}`}>
                    <Link to={HOME.route}>
                        <img src={logo} alt="logo" />
                    </Link>
                    {isMobile && (
                        <HamburgerIconMenu
                            hamburgerClickHandler={hamburgerClickHandler}
                            isNavToggled={isNavToggled}
                        />
                    )}
                </div>
                {(isNavToggled || !isMobile) && <NavLinks />}
            </div>
        </header>
    );
};
