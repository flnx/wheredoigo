import { useCallback, useState } from 'react';
import { useEditPlaceDetails } from '../../../../hooks/queries/useEditPlaceDetails';
import { validateFieldsOnEdit } from '../../../../utils/editValidators';
import { extractServerErrorMessage } from '../../../../utils/utils';
import { useEditFieldToggle } from '../../../../hooks/useEditFieldToggle';
import { useEditPlaceDescription } from '../../../../hooks/queries/place/useEditPlaceDescription';
import { editPlaceDescriptionSchema } from '../../../../utils/validationSchemas/placeSchemas';

export const useForm = ({ data, placeId, destinationId }) => {
    const [editDetails, isEditLoading] = useEditPlaceDetails(placeId, destinationId);
    const [editError, setEditError] = useState('');
    const [isEditToggled, setIsEditToggled, closeEditField] = useEditFieldToggle();
    const [editDescription, isDescLoading] = useEditPlaceDescription(placeId);

    const isLoading = isDescLoading;

    const closeEditFieldHandler = () => {
        closeEditField();
        setEditError('');
    };

    const toggleEditHandler = useCallback((clickedId) => {
        setIsEditToggled(clickedId);
        setEditError('');
    }, []);

    const { allowedPlaceCategories } = data;

    const submitHandler = useCallback(
        ({ editInfo }) => {
            try {
                // const validated = validateFieldsOnEdit(
                //     editedInfo,
                //     allowedPlaceCategories
                // );

                console.log(editInfo);

                // editDetails(editedInfo, {
                //     onSuccess: () => closeEditFieldHandler(),
                //     onError: (err) => setEditError(extractServerErrorMessage(err)),
                // });
            } catch (err) {
                setEditError(err.message);
            }
        },
        [destinationId]
    );

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
        },
        [destinationId]
    );

    return {
        isEditLoading,
        editError,
        isEditToggled,
        submitHandler,
        toggleEditHandler,
        submitDescription
    };
};
