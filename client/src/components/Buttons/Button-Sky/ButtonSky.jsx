import { ClipLoader } from 'react-spinners';
import styles from './ButtonSky.module.css';

export const ButtonSky = ({ children, onClickHandler, isLoading, type, padding }) => {
    const hidden = isLoading ? styles.hidden : null;

    return (
        <button
            style={padding ? { padding } : {}}
            className={styles['btn-sky']}
            onClick={onClickHandler}
            disabled={isLoading}
            type={type}
        >
            {isLoading && (
                <ClipLoader
                    color="#36d7b7"
                    aria-label="Loading Spinner"
                    size={22}
                    className={styles.spinner}
                />
            )}
            <span className={hidden}>{children}</span>
        </button>
    );
};
