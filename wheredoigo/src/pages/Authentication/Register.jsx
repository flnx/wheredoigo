import { useState } from 'react';
import { Link } from 'react-router-dom';

// api
import * as user from '../../service/auth/register';

// utils
import * as validate from '../../utils/regexValidators';
import { validateRegisterData } from '../../utils/userDataValidators';

import styles from './FormLayout.module.css';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [inputError, setInputError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        const usernameValidation = validate.username(username);
        const passwordValidation = validate.password(password);
        const emailValidation = validate.email(email);

        const error = validateRegisterData({
            usernameValidation,
            passwordValidation,
            emailValidation,
            password,
            repeatPassword,
        });

        if (error) {
            return setInputError(error);
        }

        setInputError(false);
        setIsSuccess(true);

        // try {
        //     const res = await user.register({ username, password, email });
        // } catch (err) {
        //     console.log(err);
        // }
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.formField}>
                <label className={styles.formFieldLabel} htmlFor="name">
                    Username
                </label>
                <input
                    type="text"
                    className={styles.formFieldInput}
                    placeholder="Enter your user name"
                    name="userName"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.formField}>
                <label className={styles.formFieldLabel} htmlFor="password">
                    Repeat Password
                </label>
                <input
                    type="password"
                    className={styles.formFieldInput}
                    placeholder="Repeat your password"
                    name="repeatPassword"
                    autoComplete="off"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
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
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {inputError && (
                <div className={styles.formField}>
                    <p className={styles.error}>{inputError}</p>
                </div>
            )}

            {/* <div className={styles.formField}>
                <label className={styles.formFieldCheckboxLabel}>
                    <input
                        className={styles.formFieldCheckbox}
                        type="checkbox"
                        name="hasAgreed"
                        autoComplete="off"
                        defaultValue=""
                    />
                    I agree all statements in
                    <a href="#" className={styles.formFieldTermsLink}>
                        terms of service
                    </a>
                </label>
            </div> */}

            <div className={styles.formField}>
                <button
                    className={`${styles.formFieldButton} ${
                        isSuccess && styles.disabled
                    }`}
                    disabled={isSuccess}
                >
                    Register
                </button>
                <Link to="/login" className={styles.formFieldLink}>
                    I'm already member
                </Link>
            </div>
        </form>
    );
};
