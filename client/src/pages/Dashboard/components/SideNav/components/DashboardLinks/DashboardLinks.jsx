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

    return (
        <nav className={styles.navbar}>
            <IconLink to={routeConstants.DASHBOARD.route} Icon={AppWindow}>
                {routeConstants.DASHBOARD.name}
            </IconLink>

            <IconLink to={ADD_DESTINATION.routePath} Icon={Plus}>
                {ADD_DESTINATION.name}
            </IconLink>

            <IconLink to={MY_DESTINATIONS.routePath} Icon={SuitcaseRolling}>
                {MY_DESTINATIONS.name}
            </IconLink>

            <IconLink to={FAVORITES.routePath} Icon={Heart}>
                {FAVORITES.name}
            </IconLink>

            <IconLink to={SETTINGS.routePath} Icon={GearSix}>
                {SETTINGS.name}
            </IconLink>
        </nav>
    );
};
