import styles from './SuccessButton.module.css';

export const SuccessButton = ({ children, onClickHandler, isLoading }) => {
    return (
        <button 
            className={styles['success-button']} 
            onClick={onClickHandler} 
            disabled={isLoading}
        >
            {children}
        </button>
    );
};
