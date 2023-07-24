import PropTypes from 'prop-types';
import { useImages } from 'src/hooks/useImages';
import { createImagesFormData } from 'src/utils/formData';

// Components
import { DarkOverlay } from 'src/components/DarkOverlay/DarkOverlay';
import { ImageUploader } from 'src/components/ImageUploader/ImageUploader';
import { SuccessButton } from 'src/components/Buttons/Success-Button/SuccessButton';
import { ImageThumbnailsPreview } from 'src/components/ImageThumbnailsPreview/ImageThumbnailsPreview';

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
            <ImageUploader addImages={addImages} />

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
