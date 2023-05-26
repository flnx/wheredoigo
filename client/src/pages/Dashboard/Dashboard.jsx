import { Outlet } from 'react-router-dom';

// Components
import { SideNavigation } from './components/SideNav/SideNavigation';

import styles from './Dashboard.module.css';
import { SideStats } from './components/SideStats/SideStats';

export const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <section className={styles.sideNavSection}>
                <SideNavigation />
            </section>
            <section className={styles.mainContent}>
                <Outlet />
            </section>
            <aside className={styles.stats}>
               <SideStats />
            </aside>
        </div>
    );
};
