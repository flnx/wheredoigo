import styles from './SuccessButton.module.css';

export const SuccessButton = ({ children, onClickHandler }) => {
    return (
        <button className={styles['success-button']} onClick={onClickHandler}>
            {children}
        </button>
    );
};
