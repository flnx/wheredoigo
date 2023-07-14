// Icons
import { AppWindow } from '@phosphor-icons/react';
import { Plus } from '@phosphor-icons/react';
import { SuitcaseRolling } from '@phosphor-icons/react';
import { GearSix } from '@phosphor-icons/react';
import { Heart } from '@phosphor-icons/react';
import { IconLink } from '../../../../../../components/Buttons/IconLink/IconLink';

import routeConstants from '../../../../../../constants/routeConstants';
import styles from './DashboardLinks.module.css';

export const DashboardLinks = () => {
    const { ADD_DESTINATION, MY_DESTINATIONS, FAVORITES, SETTINGS } = routeConstants.DASHBOARD;

    const hideTextMobileClass = styles.navHiddenMobile;

    return (
        <nav className={styles.navbar}>
            <IconLink
                className={hideTextMobileClass}
                to={routeConstants.DASHBOARD.route}
                Icon={AppWindow}
            >
                {routeConstants.DASHBOARD.name}
            </IconLink>

            <IconLink
                className={hideTextMobileClass}
                to={ADD_DESTINATION.routePath}
                Icon={Plus}
            >
                {ADD_DESTINATION.name}
            </IconLink>

            <IconLink
                className={hideTextMobileClass}
                to={MY_DESTINATIONS.routePath}
                Icon={SuitcaseRolling}
            >
                {MY_DESTINATIONS.name}
            </IconLink>

            <IconLink 
                className={hideTextMobileClass} 
                to={FAVORITES.routePath} 
                Icon={Heart}
            >
                {FAVORITES.name}
            </IconLink>

            <IconLink 
                className={hideTextMobileClass} 
                to={SETTINGS.routePath} 
                Icon={GearSix}
            >
                {SETTINGS.name}
            </IconLink>
        </nav>
    );
};
