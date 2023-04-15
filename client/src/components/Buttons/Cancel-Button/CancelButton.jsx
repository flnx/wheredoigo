import React from 'react';
import styles from './CancelButton.module.css';

export const CancelButton = ({ children, onClickHandler }) => {
    return (
        <button className={styles['cancel-button']} onClick={onClickHandler}>
            {children}
        </button>
    );
};
