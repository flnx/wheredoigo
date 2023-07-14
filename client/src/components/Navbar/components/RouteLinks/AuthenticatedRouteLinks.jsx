import { Link } from './Link';

import routeConstants from '../../../../constants/routeConstants';
const { DASHBOARD, AUTH } = routeConstants;

// Icons
import { AppWindow } from '@phosphor-icons/react';
import { Plus } from '@phosphor-icons/react';
import { SuitcaseRolling } from '@phosphor-icons/react';
import { GearSix } from '@phosphor-icons/react';
import { SignOut } from '@phosphor-icons/react';
import { IconLink } from '../../../Buttons/IconLink/IconLink';

export const AuthenticatedRouteLinks = () => {
    return (
        <>
            <li>
                <IconLink to={DASHBOARD.route} Icon={AppWindow}>
                    {DASHBOARD.name}
                </IconLink>
            </li>

            <li>
                <IconLink to={DASHBOARD.ADD_DESTINATION.routePath} Icon={Plus}>
                    {DASHBOARD.ADD_DESTINATION.name}
                </IconLink>
            </li>

            <li>
                <IconLink to={DASHBOARD.MY_DESTINATIONS.routePath} Icon={SuitcaseRolling}>
                    {DASHBOARD.MY_DESTINATIONS.name}
                </IconLink>
            </li>

            <li>
                <IconLink to={DASHBOARD.SETTINGS.routePath} Icon={GearSix}>
                    {DASHBOARD.SETTINGS.name}
                </IconLink>
            </li>

            <li>
                <IconLink to={DASHBOARD.SETTINGS.routePath} Icon={GearSix}>
                    {DASHBOARD.SETTINGS.name}
                </IconLink>
            </li>

            <li>
                <IconLink to={AUTH.LOGOUT.route} Icon={SignOut}>
                    {AUTH.LOGOUT.name}
                </IconLink>
            </li>
        </>
    );
};
