import styles from './ButtonSky.module.css';

export const ButtonSky = ({ children, onClickHandler, disabled, type }) => {
    return (
        <button
            className={styles['btn-sky']}
            onClick={onClickHandler}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};
