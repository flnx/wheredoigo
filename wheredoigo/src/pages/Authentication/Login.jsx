import { Link } from 'react-router-dom';
import styles from './FormLayout.module.css';

export const Login = () => {
    return (
        <form className={styles.form}>
            <div className={styles.formField}>
                <label className={styles.formFieldLabel} htmlFor="email">
                    E-Mail Address
                </label>
                <input
                    type="email"
                    className={styles.formFieldInput}
                    placeholder="Enter your email"
                    name="email"
                    defaultValue=""
                />
            </div>

            <div className={styles.formField}>
                <label className={styles.formFieldLabel} htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    className={styles.formFieldInput}
                    placeholder="Enter your password"
                    name="password"
                    defaultValue=""
                />
            </div>

            <div className={styles.formField}>
                <button className={styles.formFieldButton} type="submit">
                    Login
                </button>
                <Link to="/register" className={styles.formFieldLink}>
                    Create an account
                </Link>
            </div>
        </form>
    );
};
