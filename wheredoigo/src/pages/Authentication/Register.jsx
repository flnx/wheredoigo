import { Link } from 'react-router-dom';

import styles from './FormLayout.module.css';

export const Register = () => {
    return (
        <form>
            <div className={styles.formField}>
                <label className={styles.formFieldLabel} htmlFor="name">
                    Full Name
                </label>
                <input
                    type="text"
                    className={styles.formFieldInput}
                    placeholder="Enter your full name"
                    name="name"
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
                <label className={styles.formFieldCheckboxLabel}>
                    <input
                        className={styles.formFieldCheckbox}
                        type="checkbox"
                        name="hasAgreed"
                        defaultValue=""
                    />
                    I agree all statements in
                    <a href="#" className={styles.formFieldTermsLink}>
                        terms of service
                    </a>
                </label>
            </div>

            <div className={styles.formField}>
                <button className={styles.formFieldButton}>Register</button>
                <Link to="/login" className={styles.formFieldLink}>
                    I'm already member
                </Link>
            </div>
        </form>
    );
};
