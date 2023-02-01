import { NavLink } from 'react-router-dom';
import styles from './FormLayout.module.css';

export const FormLayout = ({ page: Page }) => {
    return (
        <div className={styles.container}>
            <div className={styles.aside} />
            <div className={styles.wrapper}>
                <div className={styles.pageSwitcher}>
                    <NavLink to="/login" className={styles.switcherItem}>
                        Login
                    </NavLink>
                    <NavLink to="/register" className={styles.switcherItem}>
                        Register
                    </NavLink>
                </div>
                <div className={styles.formTitle}>
                    <NavLink to="/login" className={styles.formTitleLink}>
                        Login
                    </NavLink>
                    <NavLink to="/register" className={styles.formTitleLink}>
                        Register
                    </NavLink>
                </div>
                <div className={styles.formCenter}>
                    <Page />
                </div>
            </div>
        </div>
    );
};
