import { useCallback, useState } from 'react';
import { useEditDestinationDetails } from '../../../../hooks/queries/useEditDestinationDetails';
import { validateFieldsOnEdit } from '../../../../utils/editValidators';
import { extractServerErrorMessage } from '../../../../utils/utils';
import { useEditDestinationDescription } from '../../../../hooks/queries/editDestinationDescription';
import { useEditFieldToggle } from '../../../../hooks/useEditFieldToggle';
import { editDestDescriptionSchema } from '../../../../utils/validationSchemas/destinationSchemas';

export const useForm = ({ destinationId, allowedCategories }) => {
    const [editDetails, isEditLoading] = useEditDestinationDetails(destinationId);
    const [editDesc, isDescLoading] = useEditDestinationDescription(destinationId);
    const [isEditable, setIsEditable, closeEditField] = useEditFieldToggle();
    const [editError, setEditError] = useState('');

    const isLoading = isEditLoading || isDescLoading;

    const closeEditFieldHandler = () => {
        closeEditField();
        setEditError('');
    }

    const onFieldToggleHandler = useCallback((clickedId) => {
        setIsEditable(clickedId);
        setEditError('');
    }, []);

    const sendEditedFieldClickHandler = useCallback(({ editInfo }) => {
        try {
            const validated = validateFieldsOnEdit(editInfo, allowedCategories);

            editDetails(validated, {
                onSuccess: () => closeEditFieldHandler(),
                onError: (err) => setEditError(extractServerErrorMessage(err)),
            });
        } catch (err) {
            setEditError(err.message);
        }
    },
        [destinationId]
    );

    const submitDescriptionHandler = useCallback(({ editInfo }) => {
        try {
            editDestDescriptionSchema.validateSync(editInfo);

            editDesc(editInfo, {
                onSuccess: () => closeEditFieldHandler(),
                onError: (err) => setEditError(extractServerErrorMessage(err)),
            });
        } catch (err) {
            setEditError(err.errors[0]);
        }
    }, []);

    return {
        isEditable,
        isEditLoading: isLoading,
        editError,
        onEditButtonClickHandler: onFieldToggleHandler,
        sendEditedFieldClickHandler,
        submitDescriptionHandler,
    };
};
