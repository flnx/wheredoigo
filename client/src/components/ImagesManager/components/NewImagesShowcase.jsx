import { useReducer } from 'react';

import { imagesReducer, initialState } from '../../../utils/imagesReducer';
import { createImagesFormData } from '../../../utils/formData';

// Components
import { UploadImagesPreview } from '../../UploadImagesPreview/UploadImagesPreview';
import { SuccessButton } from '../../Buttons/Success-Button/SuccessButton';

import styles from './NewImagesShowcase.module.css';

export const NewImagesShowcase = ({ uploadImagesHandler, isUploading }) => {
    const [newImagesState, dispatch] = useReducer(imagesReducer, initialState);
    const hasNewlyUploadImages = newImagesState.imageUrls.length > 0;

    const dispatchHandler = (action) => {
        dispatch(action);
    };

    const handleNewImagesSubmit = async (e) => {
        e.preventDefault();

        if (!hasNewlyUploadImages || isUploading) return;

        const formData = await createImagesFormData(newImagesState);

        const dispatchReset = () => dispatch({ type: 'reset' });

        uploadImagesHandler(formData, dispatchReset);
    };

    return (
        <div className={styles['newly-uploaded-images']}>
            <UploadImagesPreview
                images={newImagesState.imageUrls}
                dispatchHandler={dispatchHandler}
            />

            {hasNewlyUploadImages && (
                <SuccessButton onClickHandler={handleNewImagesSubmit} isLoading={isUploading}>
                    Add
                </SuccessButton>
            )}
        </div>
    );
};
