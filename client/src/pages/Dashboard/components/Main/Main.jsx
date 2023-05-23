import { UserLastActivities } from './components/UserLastActivities/UserLastActivities';
import { RecentActivities } from './components/RecentActivities/RecentActivities';
import styles from './Main.module.css';
import { useUserActivity } from '../../../../hooks/queries/useUserActivity';

export const Main = () => {
    const { data, isLoading, error } = useUserActivity();

    if(isLoading) return;

    return (
        <div className={styles.container}>
            <h1 className="smaller">Dashboard</h1>
            <UserLastActivities />
            <RecentActivities activities={data}/>
        </div>
    );
};
