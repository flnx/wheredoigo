import React from 'react';
import styles from './SaveButton.module.css';

export const SaveButton = ({ children, onClickHandler }) => {
    return (
        <button className={styles['save-button']} onClick={onClickHandler}>
            {children}
        </button>
    );
};
