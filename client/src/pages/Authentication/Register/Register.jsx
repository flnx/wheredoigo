import { Link } from 'react-router-dom';

// Hooks
import { useUserRegister } from '../../../hooks/queries/useUserRegister';
import { useSubmitFormData } from '../hooks/useSubmitFormData';
import { useFormInput } from '../hooks/useFormInput';

// Components
import { FormLayout } from '../FormLayout';
import { FormInput } from '../components/FormInput';
import { ButtonSky } from '../../../components/Buttons/Button-Sky/ButtonSky';

import routeConstants from '../../../constants/routeConstants';

import styles from '../FormLayout.module.css';

const { AUTH } = routeConstants;

const Register = () => {
    const [state, onChangeHandler] = useFormInput();
    const [register, isLoading] = useUserRegister();
    const [submitHandler, error] = useSubmitFormData(state, register, isLoading);

    return (
        <FormLayout>
            <form className={styles.form} onSubmit={submitHandler}>
                <FormInput
                    name={'username'}
                    label={'Username'}
                    type={'text'}
                    placeholder={'Add a username'}
                    value={state.username}
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
                <FormInput
                    name={'repeatPassword'}
                    label={'Repeat Password'}
                    type={'password'}
                    placeholder={'Repeat password'}
                    value={state.repeatPassword}
                    onChangeHandler={onChangeHandler}
                />
                <FormInput
                    name={'email'}
                    label={'Email'}
                    type={'email'}
                    placeholder={'Enter your email address'}
                    value={state.email}
                    onChangeHandler={onChangeHandler}
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
