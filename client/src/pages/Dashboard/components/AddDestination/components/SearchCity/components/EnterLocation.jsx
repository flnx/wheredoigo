import { MagnifyingGlass } from '@phosphor-icons/react';
import styles from '../SearchCity.module.css';

export const EnterLocation = () => {
    return (
        <div className={styles.searchResult}>
            <MagnifyingGlass size={28} />
            <span>Enter location...</span>
        </div>
    );
};
