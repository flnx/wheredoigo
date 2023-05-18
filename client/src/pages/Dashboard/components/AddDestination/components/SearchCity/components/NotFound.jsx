import { XCircle } from '@phosphor-icons/react';
import styles from '../../../AddDestination.module.css';

export const NotFound = () => {
    return (
        <div className={styles.searchQuery}>
            <XCircle size={26} />
            <span>No location found...</span>
        </div>
    );
};
