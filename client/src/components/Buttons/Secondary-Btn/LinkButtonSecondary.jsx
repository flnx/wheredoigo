import { Link } from 'react-router-dom';

import styles from './SecondaryButton.module.css';

export const LinkButtonSecondary = ({ children, to }) => {
    return (
        <Link className={`${styles.btn} ${styles.link}`} to={to}>
            {children}
        </Link>
    );
};
