import { XCircle } from '@phosphor-icons/react';
import styles from '../SearchCity.module.css';

export const NotFound = () => {
    return (
        <div className={styles.searchResult}>
            <XCircle size={26} />
            <span>No location found...</span>
        </div>
    );
};
