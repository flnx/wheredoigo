const yup = require('yup');
const { errorMessages } = require('../../constants/errorMessages');
const { destinationDetails, destinationCategories } = require('../../constants/allowedDestinationCategories');

const createDestinationSchema = yup.object({
    city: yup
        .string()
        .required(errorMessages.data.required('City'))
        .min(1, errorMessages.data.city)
        .max(85, errorMessages.data.city),
    country: yup
        .string()
        .required()
        .min(4, errorMessages.data.country)
        .max(56, errorMessages.data.country),
    description: yup
        .string()
        .required(errorMessages.data.required('Description')),
    details: yup
        .array()
        .required()
        .of(
            yup.object({
                name: yup
                    .string()
                    .required(errorMessages.data.required('Details name'))
                    .oneOf(destinationDetails, errorMessages.data.details),
                content: yup.string(),
            })
        ).test('non-repeating-names', errorMessages.data.details, (details) => {
            const names = details.map(detail => detail.name);
            const uniqueNames = new Set(names);

            return uniqueNames.size === destinationDetails.length
        }),
    category: yup
        .array()
        .required()
        .min(1, errorMessages.data.category)
        .of(yup.string().oneOf(destinationCategories))
        .test(
            'non-repeating-categories', 
            errorMessages.data.repeatingValues('Categories'), 
            (categories) => {
                const uniqueCategories = new Set(categories);

                return uniqueCategories.size === categories.length;
            }
        )
});

module.exports = createDestinationSchema;
