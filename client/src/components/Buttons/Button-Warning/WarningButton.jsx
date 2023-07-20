import styles from './WarningButton.module.css';

export const WarningButton = ({ children, onClickHandler, isLoading }) => {
    return (
        <button 
            className={styles['warning-button']} 
            onClick={onClickHandler} 
            disabled={isLoading}
            type="button"
        >
            {children}
        </button>
    );
};
