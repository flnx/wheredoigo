import PropTypes from 'prop-types';
import { useImages } from '../../../hooks/useImages';
import { createImagesFormData } from '../../../utils/formData';

// Components
import { DarkOverlay } from '../../DarkOverlay/DarkOverlay';
import { ImageUploader } from '../../ImageUploader/ImageUploader';
import { SuccessButton } from '../../Buttons/Success-Button/SuccessButton';
import { ImageThumbnailsPreview } from '../../ImageThumbnailsPreview/ImageThumbnailsPreview';

const propTypes = {
    uploadImagesHandler: PropTypes.func.isRequired,
    isUploading: PropTypes.bool.isRequired,
};

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {isUploading && <DarkOverlay isLoading={isUploading} />}
            <ImageUploader
                images={images.imageUrls}
                addImages={addImages}
                deleteImage={deleteImage}
            />

            <ImageThumbnailsPreview
                images={images.imageUrls}
                handleDeleteImage={(_, index) => deleteImage(index)}
            />

            {hasNewlyUploadImages && (
                <SuccessButton onClickHandler={handleNewImagesSubmit} isLoading={isUploading}>
                    Add
                </SuccessButton>
            )}
        </div>
    );
};

NewImagesShowcase.propTypes = propTypes;
