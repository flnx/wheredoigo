const yup = require('yup');
const { errorMessages } = require('../../constants/errorMessages');

const editPlaceDescriptionSchema = yup.object({
    description: yup
        .string()
        .required(errorMessages.data.required('Description'))
        .min(50, errorMessages.validation.description(50, 5000))
        // 15k max initial check before the html sanitization and tags removal
        .max(15000, errorMessages.validation.description(50, 5000)),
});

module.exports = editPlaceDescriptionSchema;
