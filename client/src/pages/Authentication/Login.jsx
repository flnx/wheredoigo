import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { extractServerErrorMessage } from '../../utils/utils';

import * as user from '../../service/auth/login';
import { AuthContext } from '../../context/AuthContext';
import { validateLoginData } from '../../utils/userDataValidators';

import styles from './FormLayout.module.css';

export const Login = () => {
    const { setUserData } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isDisabled) return;

        
        if (!email) {
            return setError('Email address is required');
        }
        
        if (!password) {
            return setError('Password is required');
        }
        
        const loginErrors = validateLoginData({ email, password });

        if (loginErrors) {
            return setError(loginErrors);
        }
        
        setIsDisabled(true);
        
        try {
            const { data } = await user.login({ email, password });
            setUserData(data);
        } catch (err) {
            const errorMessage = extractServerErrorMessage(err);
            setError(errorMessage);
        } finally {
            setIsDisabled(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.formField}>
                <label className={styles.formFieldLabel} htmlFor="email">
                    E-Mail Address
                </label>
                <input
                    type="email"
                    className={styles.formFieldInput}
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && (
                <div className={styles.formField}>
                    <p className={styles.error}>{error}</p>
                </div>
            )}

            <div className={styles.formField}>
                <button
                    className={`${styles.formFieldButton} ${
                        isDisabled && styles.disabled
                    }`}
                    type="submit"
                    disabled={isDisabled}
                >
                    Login
                </button>
                <Link to="/register" className={styles.formFieldLink}>
                    Create an account
                </Link>
            </div>
        </form>
    );
};
