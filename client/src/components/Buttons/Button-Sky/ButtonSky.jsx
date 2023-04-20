import styles from './ButtonSky.module.css';

export const ButtonSky = ({ children, onClickHandler, disabled }) => {
    return (
        <button className={styles['btn-sky']} onClick={onClickHandler} disabled={disabled}>
            {children}
        </button>
    );
};
