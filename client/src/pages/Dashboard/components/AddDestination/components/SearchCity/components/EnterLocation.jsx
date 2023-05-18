import { MagnifyingGlass } from '@phosphor-icons/react';
import styles from '../../../AddDestination.module.css';

export const EnterLocation = () => {
    return (
        <div className={styles.searchQuery}>
            <MagnifyingGlass size={28} />
            <span>Enter location...</span>
        </div>
    );
};
