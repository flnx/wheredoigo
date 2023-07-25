import * as yup from 'yup';
import errorMessages from 'src/constants/errorMessages';

const regex = Object.freeze({
    // Min 8 chars, at least 1 letter and 1 num (special chars allowed)
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+.]{8,}$/,
    username: /^[a-zA-Z0-9]{2,12}$/, // Alpha numeric username 2-12 chars
});

export const userLoginSchema = yup.object({
    email: yup
        .string()
        .required(errorMessages.data.required('Email'))
        .email(errorMessages.auth.invalidCredentials),
    password: yup
        .string()
        .required(errorMessages.data.required('Password'))
        .matches(regex.password, errorMessages.auth.invalidCredentials),
});

export const userRegisterSchema = yup.object({
    username: yup
        .string()
        .required(errorMessages.data.required('Username'))
        .matches(regex.username, errorMessages.validation.username),
    email: yup
        .string()
        .required(errorMessages.data.required('Email'))
        .email(errorMessages.validation.email),
    password: yup
        .string()
        .required(errorMessages.data.required('Password'))
        .min(8, errorMessages.validation.shortPassword)
        .matches(regex.password, errorMessages.validation.password),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref('password')], "Passwords don't match"),
});
