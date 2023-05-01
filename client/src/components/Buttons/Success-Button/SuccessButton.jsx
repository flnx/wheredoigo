import styles from './SuccessButton.module.css';

export const SuccessButton = ({ children, onClickHandler, isLoading, type, fw, p }) => {
    const buttonStyle = {
        fontWeight: fw ? fw : '',
        padding: p ? p : '',
    };

    return (
        <button
            type={type}
            className={styles['success-button']}
            style={buttonStyle}
            onClick={onClickHandler}
            disabled={isLoading}
        >
            {children}
        </button>
    );
};
