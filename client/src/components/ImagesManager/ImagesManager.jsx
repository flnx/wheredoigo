import PropTypes from 'prop-types';

// Components
import { ServerError } from '../ServerError/ServerError';
import { ImageHandler } from './components/ImageHandler';
import { NewImagesShowcase } from './components/NewImagesShowcase';

const propTypes = {
    imagesData: PropTypes.array.isRequired,
    deleteImageHook: PropTypes.func.isRequired,
    addImageHook: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export const ImagesManager = ({
    imagesData,
    deleteImageHook,
    addImageHook,
    isLoading,
}) => {
    const [deleteImage, deleteError, isDeleting] = deleteImageHook();
    const [uploadImages, uploadError, isUploading] = addImageHook();
    const error = deleteError || uploadError;

    const deleteImageHandler = (imgId, cbCloseConfirmModal) => {
        deleteImage(imgId, {
            onSuccess: () => cbCloseConfirmModal(),
        });
    };

    const uploadImagesHandler = (formData, cbDispatch) => {
        uploadImages(formData, {
            onSuccess: () => {
                cbDispatch();
            },
            onError: () => {
                cbDispatch();
            },
        });
    };

    return (
        <section>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ImageHandler
                    imagesData={imagesData}
                    deleteImageHandler={deleteImageHandler}
                    isDeleting={isDeleting}
                    isLoading={isLoading}
                />

                {!isLoading && (
                    <NewImagesShowcase
                        uploadImagesHandler={uploadImagesHandler}
                        isUploading={isUploading}
                    />
                )}
            </div>

            {error && <ServerError errorMessage={error} />}
        </section>
    );
};

ImagesManager.propTypes = propTypes;
