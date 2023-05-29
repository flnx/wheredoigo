import { useUserActivity } from '../../../../hooks/queries/useUserActivity';

// Components
import { ServerError } from '../../../../components/ServerError/ServerError';
import { UserLastActivities } from './components/UserDashboardData/UserDashboardData';
import { RecentActivities } from './components/RecentActivities/RecentActivities';
import { ClipLoader } from 'react-spinners';

import styles from './Main.module.css';

export const Main = () => {
    const { data, isLoading, error } = useUserActivity();

    return (
        <div className={styles.container}>
            {!isLoading && !error && (
                <>
                    <h1 className="smaller">Dashboard</h1>
                    <UserLastActivities dashboardData={data} />
                    <RecentActivities activities={data} />
                </>
            )}

            <ClipLoader
                loading={isLoading}
                color="#36d7b7"
                aria-label="Loading Spinner"
                size={45}
                className={styles.spinner}
            />
            {error && <ServerError errorMessage={error} />}
        </div>
    );
};
