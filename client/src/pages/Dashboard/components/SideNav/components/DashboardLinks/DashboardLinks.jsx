import { DashboardLink } from './DashboardLink';

// Icons
import { AppWindow } from '@phosphor-icons/react';
import { Plus } from '@phosphor-icons/react';
import { SuitcaseRolling  } from '@phosphor-icons/react';
import { GearSix } from '@phosphor-icons/react';
import { Heart } from '@phosphor-icons/react';

import routeConstants from '../../../../../../constants/routeConstants';
import styles from './DashboardLinks.module.css';

export const DashboardLinks = () => {
    const { ADD_DESTINATION, MY_DESTINATIONS, FAVORITES, SETTINGS } = routeConstants.DASHBOARD;

    return (
        <nav className={styles.navbar}>
            <DashboardLink to={routeConstants.DASHBOARD.route} Icon={AppWindow}>
                {routeConstants.DASHBOARD.name}
            </DashboardLink>

            <DashboardLink to={ADD_DESTINATION.routePath} Icon={Plus}>
                {ADD_DESTINATION.name}
            </DashboardLink>

            <DashboardLink to={MY_DESTINATIONS.routePath} Icon={SuitcaseRolling }>
                {MY_DESTINATIONS.name}
            </DashboardLink>

            <DashboardLink to={FAVORITES.routePath} Icon={Heart}>
                {FAVORITES.name}
            </DashboardLink>

            <DashboardLink to={SETTINGS.routePath} Icon={GearSix}>
                {SETTINGS.name}
            </DashboardLink>
        </nav>
    );
};