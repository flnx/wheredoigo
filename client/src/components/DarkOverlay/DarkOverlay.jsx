import { ClipLoader } from 'react-spinners';
import styles from './DarkOverlay.module.css';

export const DarkOverlay = ({ onClickHandler, isLoading }) => {
    return (
        <div className={styles.overlay} onClick={onClickHandler} data-testid="overlay">
            {isLoading && (
                <ClipLoader
                    color="#36d7b7"
                    size={40}
                    loading={isLoading}
                    aria-label="Loading Spinner"
                />
            )}
        </div>
    );
};
