import { ServerError } from '../ServerError/ServerError';
import { ImageHandler } from './components/ImageHandler';
import { NewImagesShowcase } from './components/NewImagesShowcase';

import styles from './ImagesManager.module.css';

export const ImagesManager = ({
    placeId,
    destinationId,
    imagesData,
    deleteImageHook,
    addImageHook,
    isLoading,
}) => {
    const [deleteImage, deleteError, isDeleting] = deleteImageHook({ placeId, destinationId });
    const [uploadImages, uploadError, isUploading] = addImageHook({ placeId, destinationId });
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
            <div className={styles['images-container']}>
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
