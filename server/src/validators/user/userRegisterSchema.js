const yup = require('yup');

const { errorMessages } = require('../../constants/errorMessages');
const regex = require('../../utils/regex');

const userRegisterSchema = yup.object({
    email: yup
        .string()
        .email(errorMessages.validation.email)
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, errorMessages.validation.shortPassword)
        .matches(regex.password, errorMessages.validation.password),
    username: yup
        .string()
        .required('Username is required')
        .min(2, errorMessages.validation.username)
        .max(12, errorMessages.validation.username)
        .matches(regex.username, errorMessages.validation.username),
});

module.exports = userRegisterSchema;
