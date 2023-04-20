import styles from './ButtonSky.module.css';

export const ButtonSky = ({ children, onClickHandler }) => {
    return (
        <button className={styles['btn-sky']} onClick={onClickHandler}>
            {children}
        </button>
    );
};
