import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useUserLogin } from '../../../hooks/queries/useUserLogin';

// Context
import { AuthContext } from '../../../context/AuthContext';

// Utils
import { extractServerErrorMessage } from '../../../utils/utils';
import { validateLoginData } from '../../../utils/userDataValidators';

// Components
import { FormLayout } from '../FormLayout';
import { FormInput } from '../components/FormInput';
import { ButtonSky } from '../../../components/Buttons/Button-Sky/ButtonSky';

import routeConstants from '../../../constants/routeConstants';
import styles from '../FormLayout.module.css';

const { AUTH } = routeConstants;

const Login = () => {
    const { setUserData } = useContext(AuthContext);
    const [state, setState] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [login, isLoading] = useUserLogin();

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
                setUserData(result);
            },
            onError: (err) => {
                setError(extractServerErrorMessage(err));
            },
        });
    };

    return (
        <FormLayout>
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
                    <ButtonSky
                        isLoading={isLoading}
                        type={'submit'}
                        padding={`0.65rem 1.55rem`}
                    >
                        {AUTH.LOGIN.name}
                    </ButtonSky>
                    <Link to={AUTH.REGISTER.routePath} className={styles.formFieldLink}>
                        Create an account
                    </Link>
                </div>
            </form>
        </FormLayout>
    );
};

export default Login;
