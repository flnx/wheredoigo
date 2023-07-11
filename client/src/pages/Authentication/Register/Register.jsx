import { Link } from 'react-router-dom';

// Hooks
import { useErrorBoundary } from 'react-error-boundary';
import { useUserRegister } from '../../../hooks/queries/useUserRegister';
import { useSubmitFormData } from '../hooks/useSubmitFormData';
import { useFormInput } from '../hooks/useFormInput';

// Components
import { FormLayout } from '../components/FormLayout';
import { FormInput } from '../components/FormInput';
import { ButtonSky } from '../../../components/Buttons/Button-Sky/ButtonSky';
import { User } from '@phosphor-icons/react';
import { EnvelopeSimple } from '@phosphor-icons/react';
import { LockSimple } from '@phosphor-icons/react';

import routeConstants from '../../../constants/routeConstants';
import styles from '../FormLayout.module.css';

const { AUTH } = routeConstants;

const Register = () => {
    const { showBoundary } = useErrorBoundary();
    const [state, onChangeHandler] = useFormInput();
    const [register, isLoading, serverError] = useUserRegister();
    const [submitHandler, error] = useSubmitFormData(state, register, isLoading);

    if (serverError) {
        showBoundary(serverError);
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
                />
                <FormInput
                    name={'password'}
                    type={'password'}
                    placeholder={'Password'}
                    value={state.password}
                    onChangeHandler={onChangeHandler}
                    Icon={LockSimple}
                />
                <FormInput
                    name={'repeatPassword'}
                    type={'password'}
                    placeholder={'Repeat password'}
                    value={state.repeatPassword}
                    onChangeHandler={onChangeHandler}
                    Icon={LockSimple}
                />
                <FormInput
                    name={'email'}
                    type={'email'}
                    placeholder={'Email'}
                    value={state.email}
                    onChangeHandler={onChangeHandler}
                    Icon={EnvelopeSimple}
                />

                <div className={styles.errorWrapper}>
                    {error && <p className={styles.error}>{error}</p>}
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
