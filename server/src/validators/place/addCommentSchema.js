const yup = require('yup');
const { errorMessages } = require('../../constants/errorMessages');

const addCommentSchema = yup.object({
    title: yup
        .string()
        .required(errorMessages.data.required('Title'))
        .min(2, errorMessages.validation.comment.title)
        .max(100, errorMessages.validation.comment.title),
    content: yup
        .string()
        .required(errorMessages.data.required('Content'))
        .min(10, errorMessages.validation.comment.body)
        .max(2000, errorMessages.validation.comment.body),
    rating: yup
        .number()
        .integer()
        .required(errorMessages.data.required('Title'))
        .min(1)
        .max(5),
});

module.exports = addCommentSchema;
