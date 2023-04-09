import styles from './SecondaryButton.module.css';

export const SecondaryButton = ({ children, clickHandler }) => {
    return (
        <button className={styles.btn} onClick={clickHandler}>
            {children}
        </button>
    );
};
