import { Link } from 'react-router-dom';

// Hooks
import { useErrorBoundary } from 'react-error-boundary';
import { useUserLogin } from '../../../hooks/queries/useUserLogin';
import { useFormInput } from '../hooks/useFormInput';
import { useSubmitFormData } from '../hooks/useSubmitFormData';

// Components
import { FormLayout } from '../components/FormLayout';
import { FormInput } from '../components/FormInput';
import { ButtonSky } from '../../../components/Buttons/Button-Sky/ButtonSky';
import { EnvelopeSimple } from '@phosphor-icons/react';
import { LockSimple } from '@phosphor-icons/react';

import routeConstants from '../../../constants/routeConstants';
import styles from '../FormLayout.module.css';

const { AUTH } = routeConstants;

const Login = () => {
    const { showBoundary } = useErrorBoundary();
    const [state, onChangeHandler] = useFormInput();
    const [login, isLoading, serverError] = useUserLogin();
    const [submitHandler, error] = useSubmitFormData(state, login, isLoading);

    if (serverError) {
        showBoundary(serverError);
        return null;
    }

    return (
        <FormLayout>
            <form className={styles.form} onSubmit={submitHandler}>
                <FormInput
                    name={'email'}
                    type={'email'}
                    placeholder={'Email'}
                    value={state.email}
                    onChangeHandler={onChangeHandler}
                    Icon={EnvelopeSimple}
                />

                <FormInput
                    name={'password'}
                    type={'password'}
                    placeholder={'Password'}
                    value={state.password}
                    onChangeHandler={onChangeHandler}
                    Icon={LockSimple}
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
