import styles from './Main.module.css';
import { CreatorData } from './components/CreatorData/CreatorData';
import { RecentActivities } from './components/RecentActivities/RecentActivities';

export const Main = () => {
    return (
        <div className={styles.container}>
            <h1 className="smaller">Dashboard</h1>
            <CreatorData />
            <RecentActivities />
        </div>
    );
};
