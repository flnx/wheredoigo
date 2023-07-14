import { IconLink } from '../../../Buttons/IconLink/IconLink';
import { MagnifyingGlass } from '@phosphor-icons/react';

import routeConstants from '../../../../constants/routeConstants';

export const PublicRoutes = () => {
    const { DISCOVER } = routeConstants;

    return (
        <li className="public">
            <IconLink to={DISCOVER.route} Icon={MagnifyingGlass}>
                {DISCOVER.name}
            </IconLink>
        </li>
    );
};
