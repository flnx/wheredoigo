import * as yup from 'yup';
import errorMessages from '../../constants/errorMessages';

export const editPlaceDescriptionSchema = yup.object({
    description: yup.string().required(errorMessages.data.required('Description')),
    charCounter: yup
        .number()
        .required()
        .integer()
        .min(50, errorMessages.validation.description())
        .max(5000, errorMessages.validation.description()),
});

export const editPlaceTypeSchema = (allowedTypes) => {
    return yup.object({
        type: yup
            .string()
            .required(errorMessages.data.required('type'))
            .oneOf(allowedTypes, 'Invalid type'),
    });
};

export const editPlaceNameSchema = yup.object({
    name: yup
        .string()
        .required(errorMessages.data.required('name')),

    charCounter: yup
        .number()
        .required()
        .integer()
        .min(1, errorMessages.validation.placeName)
        .max(60, errorMessages.validation.placeName)
});
