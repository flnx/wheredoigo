import * as yup from 'yup';
import errorMessages from 'src/constants/errorMessages';

export const createDestinationSchema = (destinationCategories) => {
    const destinationDetails = [
        'Good to Know',
        'Transport',
        'Local Customs',
        'Pro Tips',
    ];

    return yup.object({
        city: yup
            .string()
            .required(errorMessages.data.required('City'))
            .max(85, errorMessages.data.city),
        country: yup
            .string()
            .required(errorMessages.data.required('Country'))
            .min(4, errorMessages.data.country)
            .max(56, errorMessages.data.country),
        description: yup
            .string()
            .required(errorMessages.data.required('Description')),
        charCounter: yup
            .number()
            .required()
            .integer()
            .min(50, errorMessages.validation.description())
            .max(5000, errorMessages.validation.description()),
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
            )
            .test('non-repeating-names', errorMessages.data.details, (details) => {
                const names = details.map((detail) => detail.name);
                const uniqueNames = new Set(names);

                return uniqueNames.size === destinationDetails.length;
            }),
        categories: yup
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
            ),
        imageUrls: yup
            .array()
            .required()
            .of(yup.string().required())
            .min(5, errorMessages.data.imagesBoundary(5))
            .max(50, errorMessages.data.imagesLimit),
    });
};

export const editDestDescriptionSchema = yup.object({
    description: yup.string().required(errorMessages.data.required('Description')),
    charCounter: yup
        .number()
        .required()
        .integer()
        .min(50, errorMessages.validation.description())
        .max(5000, errorMessages.validation.description()),
});

export const editDestDetailsSchema = yup.object({
    description: yup.string().required(errorMessages.data.required('Description')),
    detail_id: yup.string().required(errorMessages.data.required('detail_id')),
    charCounter: yup
        .number()
        .required()
        .integer()
        .max(5000, errorMessages.validation.description()),
});

export const editDestCategoriesSchema = (allowedCategories) =>
    yup.object({
        categories: yup
            .array()
            .required(errorMessages.data.required('Categories field'))
            .min(1, errorMessages.data.category)
            .of(
                yup
                    .string()
                    .required(errorMessages.data.category)
                    .oneOf(allowedCategories, errorMessages.data.category)
            ),
    });
