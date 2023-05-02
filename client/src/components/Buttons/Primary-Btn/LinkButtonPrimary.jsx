import { Link } from 'react-router-dom';
import styles from './PrimaryButton.module.css';

import React from 'react';

export const ButtonLinkPrimary = ({ children, to }) => {
    const link = to;

    return (
        <Link to={link} className={`${styles.primary} ${styles.link}`}>
            {children}
        </Link>
    );
};
