import { useReducer } from 'react';

import { useAddDestinationNewImages } from '../../../../hooks/queries/useAddDestinationNewImages';
import { imagesReducer, initialState } from '../../../../utils/imagesReducer';
import { createImagesFormData } from '../../../../utils/formData';

// Components
import { UploadImagesPreview } from '../../../../components/UploadImagesPreview/UploadImagesPreview';
import { SuccessButton } from '../../../../components/Buttons/Success-Button/SuccessButton';

import styles from './NewImagesUploader.module.css';

export const NewImagesUploader = ({ currentImagesHandler, destinationId }) => {
    const [uploadImages, error, isLoading] = useAddDestinationNewImages(destinationId);
    const [newImagesState, dispatch] = useReducer(imagesReducer, initialState);

    const dispatchHandler = (action) => {
        dispatch(action);
    };

    const handleNewImagesSubmit = async (e) => {
        e.preventDefault();

        if (!hasNewlyUploadImages || isLoading) return;

        const formData = await createImagesFormData(newImagesState);

        uploadImages(formData, {
            onSuccess: (result) => {
                dispatch({ type: 'reset' });
                currentImagesHandler(result.imageUrls);
            },
            onError: (e) => {
                dispatch({ type: 'reset' });
            },
        });
    };

    const hasNewlyUploadImages = newImagesState.imageUrls.length > 0;

    return (
        <div className={styles['newly-uploaded-images']}>
            {error && (
                <span className={styles.uploadError}>
                    Sorry, there was an error during the upload process. Please try again
                    later.
                </span>
            )}

            <UploadImagesPreview
                images={newImagesState.imageUrls}
                dispatchHandler={dispatchHandler}
            />

            {hasNewlyUploadImages && (
                <SuccessButton onClickHandler={handleNewImagesSubmit} isLoading={isLoading}>
                    Add
                </SuccessButton>
            )}
        </div>
    );
};
