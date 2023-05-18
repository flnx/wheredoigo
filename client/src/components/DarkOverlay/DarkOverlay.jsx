import { ClipLoader } from 'react-spinners';
import styles from './DarkOverlay.module.css';

export const DarkOverlay = ({ onClickHandler, isLoading }) => {
    return (
        <div className={styles.overlay} onClick={onClickHandler}>
            {isLoading && (
                <ClipLoader
                    color="#36d7b7"
                    size={40}
                    loading={isLoading || isDeleteLoading}
                    aria-label="Loading Spinner"
                    className={styles.spinner}
                />
            )}
        </div>
    );
};
