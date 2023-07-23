const yup = require('yup');
const { errorMessages } = require('../../constants/errorMessages');

const editPlaceNameSchema = yup.object({
    name: yup
        .string()
        .required(errorMessages.data),

    charCounter: yup
        .number()
        .required()
        .integer()
        .min(1, errorMessages.validation.placeName)
        .max(60, errorMessages.validation.placeName),
});

module.exports = editPlaceNameSchema;
