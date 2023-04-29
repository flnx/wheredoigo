import React from 'react';

import styles from './FlexSectionContainer.module.css';

export const FlexSectionContainer = ( { children } ) => {
    return (
        <div className={styles.flexContainer}>
            {children}
         </div>
    )
};