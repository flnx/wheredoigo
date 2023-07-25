import { Link } from 'react-router-dom';

// Global Hooks
import { useErrorBoundary } from 'react-error-boundary';
import { useDocumentTitle } from 'src/hooks/useDocumentTitle';

// Local Hooks
import { useFormInput } from '../hooks/useFormInput';
import { useSubmitRegister } from './useSubmitRegister';

// Global Components
import { ButtonSky } from 'src/components/Buttons/Button-Sky/ButtonSky';
// -- ICONS --
import { EnvelopeSimple } from '@phosphor-icons/react';
import { User } from '@phosphor-icons/react';
import { LockSimple } from '@phosphor-icons/react';

// Local Components
import { FormLayout } from '../components/FormLayout';
import { FormInput } from '../components/FormInput';

import routeConstants from 'src/constants/routeConstants';
import styles from '../FormLayout.module.css';
import { ShowFormError } from 'src/components/ShowFormError/ShowFormError';

const { AUTH } = routeConstants;

const Register = () => {
    useDocumentTitle('Sign Up');
    const { showBoundary } = useErrorBoundary();
    const [state, onChangeHandler] = useFormInput();
    const { submitHandler, errors, networkError, isLoading, serverErrMsg } =
        useSubmitRegister(state);

    if (networkError) {
        showBoundary(networkError);
        return null;
    }

    return (
        <FormLayout>
            <form className={styles.form} onSubmit={submitHandler}>
                <FormInput
                    name={'username'}
                    type={'text'}
                    placeholder={'Username'}
                    value={state.username}
                    onChangeHandler={onChangeHandler}
                    Icon={User}
                    errors={errors}
                />
                <FormInput
                    name={'password'}
                    type={'password'}
                    placeholder={'Password'}
                    value={state.password}
                    onChangeHandler={onChangeHandler}
                    Icon={LockSimple}
                    errors={errors}
                />
                <FormInput
                    name={'repeatPassword'}
                    type={'password'}
                    placeholder={'Repeat password'}
                    value={state.repeatPassword}
                    onChangeHandler={onChangeHandler}
                    Icon={LockSimple}
                    errors={errors}
                />
                <FormInput
                    name={'email'}
                    type={'email'}
                    placeholder={'Email'}
                    value={state.email}
                    onChangeHandler={onChangeHandler}
                    Icon={EnvelopeSimple}
                    errors={errors}
                />

                <div className={styles.errorWrapper}>
                    {serverErrMsg && <p className={styles.error}>{serverErrMsg}</p>}
                </div>

                <div className={styles.formField}>
                    <ButtonSky
                        isLoading={isLoading}
                        type={'submit'}
                        padding={`0.65rem 1.55rem`}
                    >
                        {AUTH.REGISTER.name}
                    </ButtonSky>

                    <Link to={AUTH.LOGIN.routePath} className={styles.formFieldLink}>
                        I'm already member
                    </Link>
                </div>
            </form>
        </FormLayout>
    );
};

export default Register;
