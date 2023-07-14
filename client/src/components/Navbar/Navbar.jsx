import { useState, useEffect, useContext, useRef } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

// Components
import { NavLinksDesktop } from './components/NavLinksDesktop/NavLinksDesktop';
import { AvatarIcon } from './components/AvatarIcon/AvatarIcon';
import { DesktopDropdownMenu } from './components/DropdownMenu/DesktopDropdownMenu';
import { MobileDropdownMenu } from './components/DropdownMenu/MobileDropdownMenu';
import { HamburgerIcon } from './components/HamburgerIcon/HamburgerIcon';

// assets
import logo from '../../assets/logo/logo.png';

import routeConstants from '../../constants/routeConstants';
import styles from './Navbar.module.css';
import { useCloseDropdown } from '../../hooks/useCloseDropdown';

const { HOME } = routeConstants;

export const Navbar = () => {
    const { auth } = useContext(AuthContext);
    const [isNavToggled, setIsNavToggled] = useState(false);
    const location = useLocation();
    const screenWidth = useWindowSize();

    const avatarIconRef = useRef(null);
    const desktopDropdownRef = useRef(null);

    useEffect(() => {
        setIsNavToggled(false);
    }, [location]);

    useCloseDropdown({
        isDropdownOpen: isNavToggled,
        mainElementRef: avatarIconRef,
        dropdownRef: desktopDropdownRef,
        handleCloseDropdownModal: () => setIsNavToggled(false),
    });

    const onHamburgerOrAvatarClickHandler = () => {
        setIsNavToggled(!isNavToggled);
    };

    const isMobile = screenWidth < 640;

    return (
        <header className={styles.header}>
            <div className={styles.navContainer}>
                <div className={styles.logo}>
                    <Link to={HOME.route}>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>

                <div className={styles.navContentWrapper}>
                    {!isMobile && <NavLinksDesktop />}

                    {auth.accessToken ? (
                        <AvatarIcon
                            onAvatarClickHandler={onHamburgerOrAvatarClickHandler}
                            isNavToggled={isNavToggled}
                            avatarIconRef={avatarIconRef}
                        />
                    ) : (
                        <HamburgerIcon
                            onHamburgerClickHandler={onHamburgerOrAvatarClickHandler}
                            isNavToggled={isNavToggled}
                            isMobile={isMobile}
                        />
                    )}
                </div>

                {!isMobile && isNavToggled && (
                    <DesktopDropdownMenu auth={auth} desktopDropdownRef={desktopDropdownRef} />
                )}
            </div>

            {isMobile && isNavToggled && <MobileDropdownMenu auth={auth} />}
        </header>
    );
};