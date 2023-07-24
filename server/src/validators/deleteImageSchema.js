const yup = require('yup');
const { isValid } = require('mongoose').Types.ObjectId;
const { errorMessages } = require('../constants/errorMessages');

const deleteImageSchema = yup.object({
    imgId: yup
        .string()
        .required(errorMessages.data.required('imgId'))
        .test('is-valid-mongoID', 'Invalid image ID', (id) => {
            return isValid(id);
        }),
});

module.exports = deleteImageSchema;
