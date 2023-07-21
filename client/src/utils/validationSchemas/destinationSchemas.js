import * as yup from 'yup';
import errorMessages from '../../constants/errorMessages';

export const editDestDescriptionSchema = yup.object({
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