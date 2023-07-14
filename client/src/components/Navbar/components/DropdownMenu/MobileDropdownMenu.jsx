import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../../../utils/utils';

// Components
import { UnauthenticatedRoutesLinks } from '../RouteLinks/UnauthenticatedRoutesLinks';
import { AuthenticatedRouteLinks } from '../RouteLinks/AuthenticatedRouteLinks';
import { UserDropdownIntro } from './UserDropdownIntro';
import { IconLink } from '../../../Buttons/IconLink/IconLink';
import { MagnifyingGlass } from '@phosphor-icons/react';

import styles from './MobileDropdownMenu.module.css';

import routeConstants from '../../../../constants/routeConstants';

export const MobileDropdownMenu = ({ auth, desktopDropdownRef }) => {
    const { DISCOVER } = routeConstants;

    useEffect(() => {
        disableBodyScroll();

        return () => enableBodyScroll();
    }, []);

    return (
        <ul className={styles.navbar} ref={desktopDropdownRef}>
            {!auth.accessToken ? (
                <UnauthenticatedRoutesLinks />
            ) : (
                <>
                    <UserDropdownIntro auth={auth} />
                    <li>
                        <IconLink to={DISCOVER.route} Icon={MagnifyingGlass}>
                            {DISCOVER.name}
                        </IconLink>
                    </li>

                    <AuthenticatedRouteLinks />
                </>
            )}
        </ul>
    );
};
