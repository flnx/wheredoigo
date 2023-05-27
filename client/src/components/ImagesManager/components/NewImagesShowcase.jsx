import { useImages } from '../../../hooks/useImages';
import { createImagesFormData } from '../../../utils/formData';

// Components
import { DarkOverlay } from '../../DarkOverlay/DarkOverlay';
import { UploadImagesPreview } from '../../UploadImagesPreview/UploadImagesPreview';
import { SuccessButton } from '../../Buttons/Success-Button/SuccessButton';

import styles from './NewImagesShowcase.module.css';

export const NewImagesShowcase = ({ uploadImagesHandler, isUploading }) => {
    const { images, addImages, deleteImage, resetState } = useImages();
    const hasNewlyUploadImages = images.imageUrls.length > 0;

    const handleNewImagesSubmit = async (e) => {
        e.preventDefault();

        if (!hasNewlyUploadImages || isUploading) return;

        const formData = await createImagesFormData(images);
        uploadImagesHandler(formData, resetState);
    };

    return (
        <div className={styles['newly-uploaded-images']}>
            {isUploading && <DarkOverlay isLoading={isUploading} />}
            <UploadImagesPreview
                images={images.imageUrls}
                addImages={addImages}
                deleteImage={deleteImage}
            />

            {hasNewlyUploadImages && (
                <SuccessButton onClickHandler={handleNewImagesSubmit} isLoading={isUploading}>
                    Add
                </SuccessButton>
            )}
        </div>
    );
};
