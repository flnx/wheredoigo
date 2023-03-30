import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

// api
import * as user from '../../service/auth/register';

// utils
import { validateRegisterData } from '../../utils/userDataValidators';

import styles from './FormLayout.module.css';

export const Register = () => {
    const { setUserData } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [inputError, setInputError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isDisabled) return;

        const error = validateRegisterData({
            username,
            email,
            password,
            repeatPassword,
        });

        if (error) {
            console.log(error);
            return setInputError(error);
        }

        setIsDisabled(true);

        try {
            const { data } = await user.register({ username, password, email });

            setUserData({
                username,
                accessToken: data.accessToken,
                ownerId: data.ownerId,
            });
        } catch (err) {
            const currentError = err.response.data.message;
            let errorMessage;

            if (typeof currentError == 'string') {
                errorMessage = currentError;
            } else {
                errorMessage = currentError
                    .flatMap((x) => Object.values(x))
                    .join(' + ');
            }

            setInputError(errorMessage);
            setIsDisabled(false);
        }
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
                        isDisabled && styles.disabled
                    }`}
                    disabled={isDisabled}
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
