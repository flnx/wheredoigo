const yup = require('yup');
const { errorMessages } = require('../../constants/errorMessages');
const { allowedPlaceCategories } = require('../../constants/allowedPlaceCategories');

const createNewPlaceSchema = yup.object({
    name: yup
        .string()
        .required(errorMessages.data.required('Name'))
        .min(1, errorMessages.validation.placeName)
        .max(60, errorMessages.validation.placeName),
    type: yup
        .string()
        .required(errorMessages.data.required('type'))
        .oneOf(allowedPlaceCategories, 'Invalid type'),
    description: yup
        .string()
        .required(errorMessages.data.required('Description'))
        .min(50, errorMessages.validation.description(50, 5000))
        // 15k max initial check before the html sanitization and tags removal
        .max(15000, errorMessages.validation.description(50, 5000)),
});

module.exports = createNewPlaceSchema;
