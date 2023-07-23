import { useCallback, useState } from 'react';
import { useEditPlaceDetails } from '../../../../hooks/queries/useEditPlaceDetails';
import { validateFieldsOnEdit } from '../../../../utils/editValidators';
import { extractServerErrorMessage } from '../../../../utils/utils';
import { useEditFieldToggle } from '../../../../hooks/useEditFieldToggle';
import { useEditPlaceDescription } from '../../../../hooks/queries/place/useEditPlaceDescription';
import { editPlaceDescriptionSchema, editPlaceTypeSchema } from '../../../../utils/validationSchemas/placeSchemas';
import { useEditPlaceType } from '../../../../hooks/queries/place/useEditPlaceType';

export const useForm = ({ data, placeId, destinationId }) => {
    const [editDetails, isEditLoading] = useEditPlaceDetails(placeId, destinationId);
    const [editError, setEditError] = useState('');
    const [isEditToggled, setIsEditToggled, closeEditField] = useEditFieldToggle();

    // React Query Mutations
    const [editDescription, isDescLoading] = useEditPlaceDescription(placeId);
    const [editType, isEditTypeLoading] = useEditPlaceType({ placeId, destinationId });

    const closeEditFieldHandler = () => {
        closeEditField();
        setEditError('');
    };

    const toggleEditHandler = useCallback((clickedId) => {
        setIsEditToggled(clickedId);
        setEditError('');
    }, []);

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


    const submitHandler = () => {}

    return {
        isEditLoading: isDescLoading || isEditTypeLoading,
        editError,
        isEditToggled,
        submitHandler,
        toggleEditHandler,
        submitDescription,
        submitType
    };
};
