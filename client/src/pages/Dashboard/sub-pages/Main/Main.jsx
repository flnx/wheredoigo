// React Query Hooks
import { useUserActivity } from 'src/hooks/queries/useUserActivity';

// Global Components
import { ClipLoader } from 'react-spinners';
import { ServerErrorPopUp } from 'src/components/ServerErrorPopUp/ServerErrorPopUp';

// Local Components
import { UserLastActivities } from './components/UserDashboardData/UserDashboardData';
import { RecentActivities } from './components/RecentActivities/RecentActivities';

// Utils
import { extractServerErrorMessage } from 'src/utils/utils';

import styles from './Main.module.css';

export const Main = () => {
    const [data, isLoading, error] = useUserActivity();

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
            {error && (
                <>
                    <span className="server-error">{extractServerErrorMessage(error)}</span>
                    <ServerErrorPopUp errorMessage={error} />
                </>
            )}
        </div>
    );
};
