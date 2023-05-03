import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { extractServerErrorMessage } from '../../../utils/utils';
import * as user from '../../../service/auth/login';
import { AuthContext } from '../../../context/AuthContext';
import { validateLoginData } from '../../../utils/userDataValidators';

import routeConstants from '../../../constants/routeConstants';
import styles from '../FormLayout.module.css';
import { FormInput } from '../components/FormInput';

const { AUTH } = routeConstants;

export const LoginPage = () => {
    const { setUserData } = useContext(AuthContext);
    const [state, setState] = useState({ email: '', password: '' });
    const [error, setError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isDisabled) return;

        const loginErrors = validateLoginData(state);

        if (loginErrors) {
            return setError(loginErrors);
        }

        setIsDisabled(true);

        try {
            const { data } = await user.login(state);
            setUserData(data);
        } catch (err) {
            console.log(err);
            const errorMessage = extractServerErrorMessage(err);
            setError(errorMessage);
        } finally {
            setIsDisabled(false);
        }
    };

    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <FormInput
                name={'email'}
                label={'Email Address'}
                type={'email'}
                placeholder={'Enter your email address'}
                value={state.email}
                onChangeHandler={onChangeHandler}
            />

            <FormInput
                name={'password'}
                label={'Password'}
                type={'password'}
                placeholder={'Enter your password'}
                value={state.password}
                onChangeHandler={onChangeHandler}
            />

            {error && (
                <div className={styles.formField}>
                    <p className={styles.error}>{error}</p>
                </div>
            )}

            <div className={styles.formField}>
                <button
                    className={`${styles.formFieldButton} ${isDisabled && styles.disabled}`}
                    type="submit"
                    disabled={isDisabled}
                >
                    {AUTH.LOGIN.name}
                </button>
                <Link to={AUTH.REGISTER.routePath} className={styles.formFieldLink}>
                    Create an account
                </Link>
            </div>
        </form>
    );
};
