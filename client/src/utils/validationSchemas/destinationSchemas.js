import * as yup from 'yup';
import errorMessages from '../../constants/errorMessages';

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
