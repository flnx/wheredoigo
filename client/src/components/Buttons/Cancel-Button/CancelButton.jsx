import React from 'react';
import styles from './CancelButton.module.css';

export const CancelButton = ({ children, onClickHandler, isLoading }) => {
    return (
        <button
            className={styles['cancel-button']}
            onClick={onClickHandler}
            disabled={isLoading}
            type="button"
        >
            {children}
        </button>
    );
};
