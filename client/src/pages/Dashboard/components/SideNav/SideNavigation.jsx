import { UserAvatar } from './components/UserAvatar/UserAvatar';
import { DashboardLinks } from './components/DashboardLinks/DashboardLinks';
import styles from './SideNavigation.module.css';

export const SideNavigation = () => {
    return (
        <div className={styles.sideNav}>
            <UserAvatar />
            <DashboardLinks />
        </div>
    );
};


