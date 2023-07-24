const yup = require('yup');
const { errorMessages } = require('../../constants/errorMessages');

const editPlaceNameSchema = yup.object({
    name: yup
        .string()
        .required(errorMessages.data.required('Name')),
});

module.exports = editPlaceNameSchema;