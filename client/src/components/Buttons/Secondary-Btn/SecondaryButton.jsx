import styles from './SecondaryButton.module.css';

export const SecondaryButton = ({ children, clickHandler, isLoading, padding }) => {
    const style = {
        padding: padding ? `${padding}rem` : `${0.35}rem ${0.95}rem`,
    };

    return (
        <button
            style={style}
            className={styles.btn}
            onClick={clickHandler}
            disabled={isLoading}
        >
            {children}
        </button>
    );
};
