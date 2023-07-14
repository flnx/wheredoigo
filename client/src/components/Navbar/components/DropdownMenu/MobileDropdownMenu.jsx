import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../../../utils/utils';

// Components
import { UnauthenticatedRoutesLinks } from '../RouteLinks/UnauthenticatedRoutesLinks';
import { AuthenticatedRouteLinks } from '../RouteLinks/AuthenticatedRouteLinks';
import { UserDropdownIntro } from './UserDropdownIntro';
import { X } from '@phosphor-icons/react';

import styles from './MobileDropdownMenu.module.css';

import { PublicRoutes } from './PublicRoutes';

export const MobileDropdownMenu = ({ auth, onCloseHandler }) => {
    useEffect(() => {
        disableBodyScroll();

        return () => enableBodyScroll();
    }, []);

    const authClass = !auth.accessToken ? styles.unAuth : '';

    return (
        <ul className={`${styles.navbar} ${authClass}`}>
            <X 
                size={36} 
                className={styles.closeIcon} 
                color="#fff" 
                onClick={onCloseHandler} 
            />
            {!auth.accessToken ? (
                <>
                    <UnauthenticatedRoutesLinks />
                    <PublicRoutes />
                </>
            ) : (
                <>
                    <UserDropdownIntro auth={auth} />
                    <PublicRoutes />
                    <AuthenticatedRouteLinks />
                </>
            )}
        </ul>
    );
};
