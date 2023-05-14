import { LoadingSkeleton } from '../../../LoadingSkeletons/LoadingSkeleton';

import styles from '../../ImagesGridWrapper.module.css';

export const LoadingWrapper = () => {
    return (
        <div className={styles.loading}>
            <LoadingSkeleton />
        </div>
    );
};
