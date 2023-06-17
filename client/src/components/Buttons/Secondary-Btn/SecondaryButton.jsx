import styles from './SecondaryButton.module.css';

export const SecondaryButton = ({ children, clickHandler, isLoading }) => {
    return (
        <button 
            className={styles.btn} 
            onClick={clickHandler} 
            disabled={isLoading}
        >
            {children}
        </button>
    );
};
