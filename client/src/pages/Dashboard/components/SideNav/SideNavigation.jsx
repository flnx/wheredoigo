import { NavLink, useLocation } from 'react-router-dom';

import { UserAvatar } from './UserAvatar';

// Icons
import { AppWindow } from '@phosphor-icons/react';
import { Plus } from '@phosphor-icons/react';
import { Browsers } from '@phosphor-icons/react';
import { UserCircle } from '@phosphor-icons/react';
import { GearSix } from '@phosphor-icons/react';
import { ClockCounterClockwise } from '@phosphor-icons/react';

import routeConstants from '../../../../constants/routeConstants';
import styles from './SideNavigation.module.css';

const { ADD_DESTINATION, MY_DESTINATIONS, FOLLOWERS, HISTORY, SETTINGS } = routeConstants.DASHBOARD;

export const SideNavigation = () => {
    return (
        <div className={styles.sideNav}>
            <UserAvatar />
            <nav className={styles.navbar}>
                <DashboardLink to={routeConstants.DASHBOARD.route} Icon={AppWindow}>
                    {routeConstants.DASHBOARD.name}
                </DashboardLink>

                <DashboardLink to={ADD_DESTINATION.routePath} Icon={Plus}>
                    {ADD_DESTINATION.name}
                </DashboardLink>

                <DashboardLink to={MY_DESTINATIONS.routePath} Icon={Browsers}>
                    {MY_DESTINATIONS.name}
                </DashboardLink>

                <DashboardLink to={FOLLOWERS.routePath} Icon={UserCircle}>
                    {FOLLOWERS.name}
                </DashboardLink>

                <DashboardLink to={HISTORY.routePath} Icon={ClockCounterClockwise}>
                    {HISTORY.name}
                </DashboardLink>

                <DashboardLink to={SETTINGS.routePath} Icon={GearSix}>
                    {SETTINGS.name}
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
