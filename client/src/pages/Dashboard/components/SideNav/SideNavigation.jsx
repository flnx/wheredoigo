import { NavLink, useLocation } from 'react-router-dom';

import { UserAvatar } from './UserAvatar';

// Icons
import { AppWindow } from 'phosphor-react';
import { Plus } from 'phosphor-react';
import { Browsers } from 'phosphor-react';
import { UserCircle } from 'phosphor-react';
import { GearSix } from 'phosphor-react';
import { ClockCounterClockwise } from 'phosphor-react';

import styles from './SideNavigation.module.css';

export const SideNavigation = () => {
    return (
        <div className={styles.sideNav}>
            <UserAvatar />
            <nav className={styles.navbar}>
                <DashboardLink to={'/dashboard'} Icon={AppWindow}>
                    Dashboard
                </DashboardLink>
                <DashboardLink to={'/dashboard/add'} Icon={Plus}>
                    Add Destination
                </DashboardLink>
                <DashboardLink to={'/dashboard/my-destinations'} Icon={Browsers}>
                    My Destinations
                </DashboardLink>
                <DashboardLink to={'/dashboard/followers'} Icon={UserCircle}>
                    Followers
                </DashboardLink>

                <DashboardLink to={'/dashboard/history'} Icon={ClockCounterClockwise}>
                    History
                </DashboardLink>
                <DashboardLink to={'/dashboard/settings'} Icon={GearSix}>
                    Settings
                </DashboardLink>
            </nav>
        </div>
    );
};

const DashboardLink = ({ children, Icon, to }) => {
    const location = useLocation();
    const path = to;

    const isActive = (activePath) => {
        return location.pathname === activePath ? styles.activeLink : '';
    };

    const activeClass = isActive(path);

    return (
        <NavLink to={path} className={`${styles.navLink} ${activeClass}`}>
            <div className={styles.iconFlex}>
                <Icon size={26} weight={activeClass ? 'fill' : 'regular'} />
                <span className={styles.navText}>{children}</span>
            </div>
        </NavLink>
    );
};
