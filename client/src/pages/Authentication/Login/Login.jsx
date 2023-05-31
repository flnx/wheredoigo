import { Link } from 'react-router-dom';

// Hooks
import { useUserLogin } from '../../../hooks/queries/useUserLogin';
import { useFormInput } from '../hooks/useFormInput';
import { useSubmitFormData } from '../hooks/useSubmitFormData';

// Components
import { FormLayout } from '../FormLayout';
import { FormInput } from '../components/FormInput';
import { ButtonSky } from '../../../components/Buttons/Button-Sky/ButtonSky';

import routeConstants from '../../../constants/routeConstants';
import styles from '../FormLayout.module.css';

const { AUTH } = routeConstants;

const Login = () => {
    const [state, onChangeHandler] = useFormInput();
    const [login, isLoading] = useUserLogin();
    const [submitHandler, error] = useSubmitFormData(state, login, isLoading);

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
