import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import * as user from '../../service/auth/login';
import * as validate from '../../utils/regexValidators';

import styles from './FormLayout.module.css';
import { validateLoginData } from '../../utils/userDataValidators';

import { AuthContext } from '../../context/AuthContext';

export const Login = () => {
    const { setUserData } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputError, setInputError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isDisabled) return;

        const emailValidation = validate.email(email);
        const passwordValidation = validate.password(password);

        const error = validateLoginData({
            emailValidation,
            passwordValidation,
        });

        if (error) {
            return setInputError(error);
        }

        setIsDisabled(true);

        try {
            const { data } = await user.login({ email, password });

            setUserData({
                username: data.username,
                accessToken: data.sessionToken,
                ownerId: data.objectId,
            });

            navigate('/', { replace: true });
        } catch (err) {
            const errorMessage =
                err.response.data.message || err.response.data.error;
            setInputError(errorMessage);
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

            {inputError && (
                <div className={styles.formField}>
                    <p className={styles.error}>{inputError}</p>
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
