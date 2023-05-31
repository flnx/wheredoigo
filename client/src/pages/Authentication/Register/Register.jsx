import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import * as user from '../../../service/auth/register';

// Components
import { FormLayout } from '../FormLayout';
import { FormInput } from '../components/FormInput';
import { ButtonSky } from '../../../components/Buttons/Button-Sky/ButtonSky';

import { validateRegisterData } from '../../../utils/userDataValidators';
import { extractServerErrorMessage } from '../../../utils/utils';
import routeConstants from '../../../constants/routeConstants';

import styles from '../FormLayout.module.css';

const { AUTH } = routeConstants;

const Register = () => {
    const { setUserData } = useContext(AuthContext);
    const [inputError, setInputError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [state, setState] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        username: '',
    });

    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isDisabled) return;

        const error = validateRegisterData(state);

        if (error) {
            return setInputError(error);
        }

        setIsDisabled(true);

        try {
            const { data } = await user.register(state);
            setUserData(data);
        } catch (err) {
            const errorMessage = extractServerErrorMessage(err);
            setInputError(errorMessage);
        } finally {
            setIsDisabled(false);
        }
    };

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
                    {inputError && <p className={styles.error}>{inputError}</p>}
                </div>

                <div className={styles.formField}>
                    <ButtonSky
                        isLoading={isDisabled}
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
