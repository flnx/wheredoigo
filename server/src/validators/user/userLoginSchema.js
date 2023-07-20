const yup = require('yup');
const { errorMessages } = require('../../constants/errorMessages');
const regex = require('../../utils/regex');

const userLoginSchema = yup.object({
    email: yup
        .string()
        .required(errorMessages.data.required('Email'))
        .email(errorMessages.auth.invalidCredentials),
    password: yup
        .string()
        .required(errorMessages.data.required('password'))
        .matches(regex.password, errorMessages.auth.invalidCredentials),
});

module.exports = userLoginSchema;
