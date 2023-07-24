import { useCallback, useState } from 'react';
import { extractServerErrorMessage } from 'src/utils/utils';

// React Query Hooks
import { useEditPlaceDescription } from 'src/hooks/queries/place/useEditPlaceDescription';
import { useEditPlaceType } from 'src/hooks/queries/place/useEditPlaceType';
import { useEditPlaceName } from 'src/hooks/queries/place/useEditPlaceName';

// Custom Hoooks
import { useEditFieldToggle } from 'src/hooks/useEditFieldToggle';

// Validators
import { 
    editPlaceDescriptionSchema, 
    editPlaceNameSchema, 
    editPlaceTypeSchema 
} from 'src/utils/validationSchemas/placeSchemas';

export const useForm = ({ data, placeId, destinationId }) => {
    const [editError, setEditError] = useState('');
    const [isEditToggled, setIsEditToggled, closeEditField] = useEditFieldToggle();

    // React Query Mutations
    const [editDescription, isDescLoading] = useEditPlaceDescription(placeId);
    const [editType, isEditTypeLoading] = useEditPlaceType({ placeId, destinationId });
    const [editName, isEditNameLoading] = useEditPlaceName({ placeId, destinationId });

    const closeEditFieldHandler = () => {
        closeEditField();
        setEditError('');
    };

    // Toggle
    const toggleEditHandler = useCallback((clickedId) => {
        setIsEditToggled(clickedId);
        setEditError('');
    }, []);

    // Submit Edited Type
    const submitType = useCallback((type) => {
        const { allowedPlaceCategories } = data;

        try {
            editPlaceTypeSchema(allowedPlaceCategories).validateSync(type);

            editType(type, {
                onSuccess: () => closeEditFieldHandler(),
                onError: (err) => setEditError(extractServerErrorMessage(err)),
            });
        } catch (err) {
            setEditError(err.message);
        }
    }, [destinationId]);

    // Submit Edited Description
    const submitDescription = useCallback(({ editInfo }) => {
        try {
            editPlaceDescriptionSchema.validateSync(editInfo);

            editDescription(editInfo, {
                onSuccess: () => closeEditFieldHandler(),
                onError: (err) => setEditError(extractServerErrorMessage(err)),
            });
        } catch (err) {
            setEditError(err.message);
        }
    }, [destinationId]);

    // Submit Edited Name
    const submitName = useCallback(({ editInfo }) => {
        const updatedData = { 
            name: editInfo.description,
            charCounter: editInfo.charCounter
        }

        try {
            editPlaceNameSchema.validateSync(updatedData);

            editName(updatedData, {
                onSuccess: () => closeEditFieldHandler(),
                onError: (err) => setEditError(extractServerErrorMessage(err)),
            });
        } catch (err) {
            setEditError(err.message);
        }
    }, [destinationId]);

    return {
        isEditLoading: isDescLoading || isEditTypeLoading || isEditNameLoading,
        editError,
        isEditToggled,
        submitName,
        toggleEditHandler,
        submitDescription,
        submitType
    };
};
