import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Auth Context
import { AuthContext } from 'src/context/AuthContext';

// Custom Hooks
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useCloseDropdown } from 'src/hooks/useCloseDropdown';

// Local Components
import { NavLinksDesktop } from './components/NavLinksDesktop/NavLinksDesktop';
import { AvatarIcon } from './components/AvatarIcon/AvatarIcon';
import { DesktopDropdownMenu } from './components/DropdownMenu/DesktopDropdownMenu';
import { MobileDropdownMenu } from './components/DropdownMenu/MobileDropdownMenu';
import { HamburgerIcon } from './components/HamburgerIcon/HamburgerIcon';

// assets
import logo from 'src/assets/logo/logo.png';

import routeConstants from 'src/constants/routeConstants';
import styles from './Navbar.module.css';

const { HOME } = routeConstants;

export const Navbar = () => {
    const { auth } = useContext(AuthContext);
    const [isNavToggled, setIsNavToggled] = useState(false);
    const location = useLocation();
    const screenWidth = useWindowSize();
    const avatarIconRef = useRef(null);
    const desktopDropdownRef = useRef(null);

    const isMobile = screenWidth < 640;

    // Closing dropdown when navigating to another page or when isMobile bool changes
    useEffect(() => {
        setIsNavToggled(false);
    }, [location, isMobile]);

    // Closing dropdown when clicked outside
    useCloseDropdown({
        isDropdownOpen: isNavToggled,
        mainElementRef: avatarIconRef,
        dropdownRef: desktopDropdownRef,
        handleCloseDropdownModal: () => setIsNavToggled(false),
    });

    const onHamburgerOrAvatarClickHandler = () => {
        setIsNavToggled(!isNavToggled);
    };

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
                            auth={auth}
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

            {isMobile && isNavToggled && (
                <MobileDropdownMenu
                    auth={auth}
                    onCloseHandler={onHamburgerOrAvatarClickHandler}
                />
            )}
        </header>
    );
};
