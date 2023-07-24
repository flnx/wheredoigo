import { MagnifyingGlass } from '@phosphor-icons/react';
import { IconLink } from 'src/components/Buttons/IconLink/IconLink';

import routeConstants from 'src/constants/routeConstants';

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
