import * as validate from './regexValidators';

export const validateRegisterData = ({
    username,
    email,
    password,
    repeatPassword,
}) => {
    let error = false;

    const isUsernameValid = validate.username(username);
    const isEmailValid = validate.email(email);
    const isPasswordValid = validate.password(password);

    if (!isUsernameValid) {
        error = 'Username must be between 3-25 characters long and contain only latin letters and numbers';
    } else if (!isPasswordValid) {
        error = 'Password must be at least 8 characters long containing at least 1 number and 1 letter';
    } else if (password !== repeatPassword) {
        error = "Passwords don't match";
    } else if (!isEmailValid) {
        error = 'Invalid Email Address';
    }

    return error;
};

export const validateLoginData = ({ email, password }) => {
    let error = false;

    const isEmailValid = validate.email(email);
    const isPasswordValid = validate.password(password);

    if (!isEmailValid || !isPasswordValid) {
        error = 'Invalid Email Address or Password';
    }

    return error;
};
