import { Link } from 'react-router-dom';
import styles from './SuccessButton.module.css';

export const LinkButtonSuccess = ({ children, to }) => {
    return (
        <Link
            className={`${styles.btn} ${styles.link}`}
            to={to}
        >
            {children}
        </Link>
    );
};
