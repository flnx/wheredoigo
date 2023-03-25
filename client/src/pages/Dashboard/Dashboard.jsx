import { Outlet } from 'react-router-dom';

// Components
import { CategoriesNav } from '../../components/CategoriesNav/CategoriesNav';
import { SearchBar } from '../../components/Serach-Bar/SearchBar';
import { SideNavigation } from '../../components/SideNav/SideNavigation';

import styles from './Dashboard.module.css';

export const Dashboard = () => {
    return (
        <div className="container">
            <div className={styles.grid}>
                <section className={styles.sideNav}>
                    <SideNavigation />
                </section>

                <section className={styles.searchBar}>
                    <SearchBar />
                </section>

                <section className={styles.categories}>
                    <CategoriesNav />
                </section>

                <div className={styles.destinations}>
                    <Outlet />
                </div>
                <aside className={styles.stats}>
                    <div>
                        <h2>Statistics</h2>
                        <div>
                            <p>Progress Bar</p>
                            <p>Progress Bar 2</p>
                            <p>Progress Bar 3</p>
                        </div>
                        <div>
                            <p>Chart</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
