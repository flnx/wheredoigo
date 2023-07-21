const yup = require('yup');
const { errorMessages } = require('../../constants/errorMessages');
const {
    destinationCategories,
} = require('../../constants/allowedDestinationCategories');

const editDestCategoriesSchema = yup.object({
    categories: yup
        .array()
        .required(errorMessages.data.required('Categories field'))
        .min(1)
        .of(
            yup
                .string()
                .required(errorMessages.data.category)
                .oneOf(destinationCategories, errorMessages.data.category)
        )
        .test(
            'non-repeating-categories',
            errorMessages.data.repeatingValues('Categories'),
            (categories) => {
                const uniqueCategories = new Set(categories);

                return uniqueCategories.size === categories.length;
            }
        ),
});

module.exports = editDestCategoriesSchema;
