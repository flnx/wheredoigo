export const validateRegisterData = ({
    usernameValidation,
    passwordValidation,
    emailValidation,
    password,
    repeatPassword,
}) => {
    let error = false;

    if (usernameValidation == false) {
        error = 'Username must be between 3-25 characters long and use only latin letters and numbers';
    } else if (passwordValidation == false) {
        error = 'Password must be at least 8 characters long containing at least 1 number and 1 letter';
    } else if (password !== repeatPassword) {
        error = "Passwords don't match";
    } else if (emailValidation == false) {
        error = 'Invalid Email Address';
    }

    return error;
};

export const validateLoginData = ({
    emailValidation,
    passwordValidation,
}) => {
    let error = false;

    if (emailValidation == false) {
        error = 'Invalid Email Address';
    } else if (passwordValidation == false) {
        error = 'Password must be at least 8 characters long containing at least 1 number and 1 letter';
    }

    return error;
};
