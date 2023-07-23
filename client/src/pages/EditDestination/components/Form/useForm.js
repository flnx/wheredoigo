import { useCallback, useState } from 'react';
import { extractServerErrorMessage } from '../../../../utils/utils';
import { useEditFieldToggle } from '../../../../hooks/useEditFieldToggle';

// Validation
import {
    editDestCategoriesSchema,
    editDestDescriptionSchema,
    editDestDetailsSchema,
} from '../../../../utils/validationSchemas/destinationSchemas';

// React Query
import { useEditDestinationDetails } from '../../../../hooks/queries/destination/useEditDestinationDetails';
import { useEditDestinationDescription } from '../../../../hooks/queries/destination/editDestinationDescription';
import { useEditDestinationCategories } from '../../../../hooks/queries/destination/useEditDestinationCategories';

export const useForm = ({ destinationId, allowedCategories }) => {
    const [editError, setEditError] = useState('');
    const [isEditToggled, setIsEditToggled, closeEditField] = useEditFieldToggle();
    
    // React Query Mutations
    const [editDesc, isDescLoading] = useEditDestinationDescription(destinationId);
    const [editDetails, isEditLoading] = useEditDestinationDetails(destinationId);
    const [editCategories, isCategsLoading] = useEditDestinationCategories(destinationId);

    const closeEditFieldHandler = () => {
        closeEditField();
        setEditError('');
    };

    const toggleEditHandler = useCallback((clickedId) => {
        setIsEditToggled(clickedId);
        setEditError('');
    }, []);

    const submitCategories = useCallback((editInfo) => {
        try {
            editDestCategoriesSchema(allowedCategories).validateSync(editInfo);

            editCategories(editInfo, {
                onSuccess: () => closeEditFieldHandler(),
                onError: (err) => setEditError(extractServerErrorMessage(err)),
            });
        } catch (err) {
            setEditError(err.message);
        }
    },
        [destinationId, allowedCategories]
    );

    const submitDetails = useCallback(({ editInfo }) => {
        try {
            const updated = {
                detail_id: editInfo.fieldId,
                description: editInfo.description,
                charCounter: editInfo.charCounter,
            };

            editDestDetailsSchema.validateSync(updated);

            editDetails(updated, {
                onSuccess: () => closeEditFieldHandler(),
                onError: (err) => setEditError(extractServerErrorMessage(err)),
            });
        } catch (err) {
            setEditError(err.errors[0]);
        }
    },
        [destinationId]
    );

    const submitDescription = useCallback(({ editInfo }) => {
        try {
            editDestDescriptionSchema.validateSync(editInfo);

            editDesc(editInfo, {
                onSuccess: () => closeEditFieldHandler(),
                onError: (err) => setEditError(extractServerErrorMessage(err)),
            });
        } catch (err) {
            setEditError(err.errors[0]);
        }
    },
        [destinationId]
    );

    return {
        isEditLoading: isEditLoading || isDescLoading || isCategsLoading,
        isEditToggled,
        editError,
        toggleEditHandler,
        submitCategories,
        submitDescription,
        submitDetails,
    };
};
