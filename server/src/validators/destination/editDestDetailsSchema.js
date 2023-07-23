const yup = require('yup');
const { isValid } = require('mongoose').Types.ObjectId;
const { errorMessages } = require('../../constants/errorMessages');

const editDestDetailsSchema = yup.object({
    description: yup
        .string()
        .required(errorMessages.data.required('Description'))
        // 15k max initial check before the html sanitization and tags removal
        .max(15000, errorMessages.validation.description(0, 5000)),
    detail_id: yup
        .string()
        .required(errorMessages.data.required('detail_id'))
        .test('is-valid-mongoID', errorMessages.data.notEdited, (detail_id) => {
            return isValid(detail_id);
        }),
});

module.exports = editDestDetailsSchema;
