import { useCallback, useState } from 'react';
import { useEditPlaceDetails } from '../../../../hooks/queries/useEditPlaceDetails';
import { validateFieldsOnEdit } from '../../../../utils/editValidators';
import { extractServerErrorMessage } from '../../../../utils/utils';

export const useForm = ({ data, placeId, destinationId }) => {
    const [editDetails, isEditLoading] = useEditPlaceDetails(placeId);
    const [editError, setEditError] = useState('');
    const [isEditable, setIsEditable] = useState({});

    const typeId = 'type';
    const { allowedPlaceCategories, allowedFieldsToUpdate } = data;

    const sendEditedFieldClickHandler = useCallback((fieldId, editedInfo) => {
            try {
                const validated = validateFieldsOnEdit(
                    editedInfo,
                    allowedPlaceCategories
                );
                validated.destinationId = destinationId;

                editDetails(validated, {
                    onSuccess: () => onEditButtonClickHandler(fieldId),
                    onError: (err) => setEditError(extractServerErrorMessage(err)),
                });
            } catch (err) {
                setEditError(err.message);
            }
        }, [destinationId]
    );

    const onEditButtonClickHandler = useCallback((clickedId) => {
            // enables/disables the form fields
            setIsEditable((prevState) => {
                // opens/closes the edit field
                const newState = { [clickedId]: !prevState[clickedId] };

                // closes all previously opened edit form fields (if any)
                Object.keys(prevState).forEach((fieldId) => {
                    if (fieldId !== clickedId) {
                        newState[fieldId] = false;
                    }
                });
                return newState;
            });

            // removes the error message (if any)
            editError && setEditError('');
        }, [editError]
    );

    const fieldsToUpdate = allowedFieldsToUpdate?.filter((x) => x !== typeId);

    return {
        isEditLoading,
        editError,
        isEditable,
        typeId,
        allowedPlaceCategories,
        fieldsToUpdate,
        sendEditedFieldClickHandler,
        onEditButtonClickHandler,
    };
};
