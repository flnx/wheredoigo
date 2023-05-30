import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';

// Context
import { AuthContext } from '../../../context/AuthContext';

// Utils
import { extractServerErrorMessage } from '../../../utils/utils';
import { validateLoginData } from '../../../utils/userDataValidators';

// Components
import { FormInput } from '../components/FormInput';

import routeConstants from '../../../constants/routeConstants';
import styles from '../FormLayout.module.css';
import { useLogin } from '../../../hooks/queries/useUserLogin';

const { AUTH } = routeConstants;

export const LoginPage = () => {
    const { setUserData } = useContext(AuthContext);
    const [state, setState] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [login, isLoading, serverError] = useLogin();

    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setError('');

        const hasError = validateLoginData(state);

        if (hasError) {
            return setError(hasError);
        }

        login(state, {
            onSuccess: (result) => {
                console.log(result);
                // setUserData()
            },
            onError: (err) => {
                setError(extractServerErrorMessage(err));
            },
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

            <div className={styles.errorWrapper}>
                {error && <p className={styles.error}>{error}</p>}
            </div>

            <div>
                <button
                    className={`${styles.formFieldButton} ${isLoading && styles.disabled}`}
                    type="submit"
                    disabled={isLoading}
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
