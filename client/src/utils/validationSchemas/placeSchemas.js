import * as yup from 'yup';
import errorMessages from 'src/constants/errorMessages';

export const editPlaceDescriptionSchema = yup.object({
    description: yup
        .string()
        .required(errorMessages.data.required('Description')),
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
    name: yup.string()
        .required(errorMessages.data.required('name')),
    charCounter: yup
        .number()
        .required()
        .integer()
        .max(60, errorMessages.validation.placeName),
});

export const validateAddNewPlaceSchema = (allowedTypes) => {
    return yup.object({
        name: yup
            .string()
            .required(errorMessages.data.required('Name'))
            .max(60, errorMessages.validation.placeName),
        type: yup
            .string()
            .required(errorMessages.data.required('Type'))
            .oneOf(allowedTypes, errorMessages.data.type),
        imageUrls: yup
            .array()
            .required()
            .of(yup.string().required())
            .min(5, errorMessages.data.imagesBoundary(5))
            .max(50, errorMessages.data.imagesLimit),
        description: yup.object({
            text: yup
                .string()
                .required(errorMessages.data.required('Description')),
            charCounter: yup
                .number()
                .required()
                .integer()
                .min(50, errorMessages.validation.description())
                .max(5000, errorMessages.validation.description()),
        }),
    });
};
