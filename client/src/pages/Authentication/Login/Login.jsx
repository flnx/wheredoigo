import { Link } from 'react-router-dom';

// Global Hooks
import { useErrorBoundary } from 'react-error-boundary';
import { useDocumentTitle } from 'src/hooks/useDocumentTitle';

// Local Hooks
import { useFormInput } from '../hooks/useFormInput';

// Global Components 
import { ButtonSky } from 'src/components/Buttons/Button-Sky/ButtonSky';
// --ICONS--
import { EnvelopeSimple } from '@phosphor-icons/react';
import { LockSimple } from '@phosphor-icons/react';

// Local Components
import { FormLayout } from '../components/FormLayout';
import { FormInput } from '../components/FormInput';

import routeConstants from 'src/constants/routeConstants';
import styles from '../FormLayout.module.css';
import { useSubmitLogin } from './useSubmitLogin';

const { AUTH } = routeConstants;

const Login = () => {
    useDocumentTitle('Login');
    const { showBoundary } = useErrorBoundary();
    const [state, onChangeHandler] = useFormInput();
    const { submitHandler, error, serverError, isLoading } = useSubmitLogin(state);

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
