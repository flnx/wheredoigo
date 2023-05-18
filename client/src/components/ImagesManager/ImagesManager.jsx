import { ServerError } from '../ServerError/ServerError';
import { ImageHandler } from './components/ImageHandler';
import { NewImagesShowcase } from './components/NewImagesShowcase';

import styles from './ImagesManager.module.css';

export const ImagesManager = ({
    _id,
    _id2,
    imagesData,
    deleteImageHook,
    addImageHook,
    isLoading,
}) => {
    const [deleteImage, deleteError, isDeleting] = deleteImageHook(_id, _id2);
    const [uploadImages, uploadError, isUploading] = addImageHook(_id, _id2);
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
