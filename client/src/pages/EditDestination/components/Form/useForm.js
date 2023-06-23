import { useCallback, useState } from 'react';
import { useEditDestinationDetails } from '../../../../hooks/queries/useEditDestinationDetails';
import { validateFieldsOnEdit } from '../../../../utils/editValidators';

import { extractServerErrorMessage } from '../../../../utils/utils';

export const useForm = ({ destinationId, allowedCategories }) => {
    const [editDetails, isEditLoading] = useEditDestinationDetails(destinationId);
    const [isEditable, setIsEditable] = useState({});
    const [editError, setEditError] = useState('');

    const onEditButtonClickHandler = useCallback(
        (clickedId) => {
            // enables/disables the form fields
            setIsEditable((prevState) => {
                // opens/closes the edit field
                const newState = { [clickedId]: !prevState[clickedId] };

                // closes all previously opened edit formfields (if any)
                Object.keys(prevState).forEach((fieldId) => {
                    if (fieldId !== clickedId) {
                        newState[fieldId] = false;
                    }
                });

                return newState;
            });
            // removes the error message (if any)
            editError && setEditError('');
        },
        [editError]
    );

    const sendEditedFieldClickHandler = useCallback((fieldId, editedInfo) => {
        try {
            const validated = validateFieldsOnEdit(editedInfo, allowedCategories);

            editDetails(validated, {
                onSuccess: () => onEditButtonClickHandler(fieldId),
                onError: (err) => setEditError(extractServerErrorMessage(err)),
            });
        } catch (err) {
            setEditError(err.message);
        }
    }, []);

    const descriptionID = 'Description';
    const categoriesID = 'Categories';

    return {
        isEditable,
        isEditLoading,
        editError,
        onEditButtonClickHandler,
        sendEditedFieldClickHandler,
        descriptionID,
        categoriesID,
    };
};
