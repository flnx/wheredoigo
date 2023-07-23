const yup = require('yup');
const { errorMessages } = require('../../constants/errorMessages');
const { allowedPlaceCategories } = require('../../constants/allowedPlaceCategories');

const editPlaceTypeSchema = yup.object({
    type: yup
        .string()
        .required(errorMessages.data.required('type'))
        .oneOf(allowedPlaceCategories, 'Invalid type'),
});

module.exports = editPlaceTypeSchema;