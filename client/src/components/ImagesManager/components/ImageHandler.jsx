import { useState } from 'react';

// Components
import { ConfirmModal } from '../../ConfirmModal/ConfirmModal';
import { ImageThumbnailsPreview } from '../../ImageThumbnailsPreview/ImageThumbnailsPreview';
import { NewImagesShowcase } from './NewImagesShowcase';

import styles from './ImageHandler.module.css';

export const ImageHandler = ({
    imagesData,
    uploadImagesHandler,
    deleteImageHandler,
    isDeleting,
    isUploading,
    uploadError,
    deleteError,
}) => {
    const [images, setImages] = useState(imagesData);
    const [openModal, setOpenModal] = useState(false);
    const [imgIndexToDelete, setImgIndexToDelete] = useState(null);

    const onDeleteClickOpenConfirmModalHandler = (index) => {
        setOpenModal(true);
        setImgIndexToDelete(index);
    };

    const handleCloseConfirmModal = () => {
        setOpenModal(false);
        setImgIndexToDelete(null);
    };

    const handleConfirmDelete = () => {
        const imgId = images[imgIndexToDelete]._id;

        const setImagesHandler = () => {
            setImages((prevState) => prevState.filter((img, i) => imgIndexToDelete !== i));
            handleCloseConfirmModal();
        };

        deleteImageHandler({ imgId }, setImagesHandler);
    };

    const currentImagesHandler = (newImages) => {
        setImages((prevState) => [...prevState, ...newImages]);
    };

    const hasCurrentImages = images.length > 0;

    return (
        <section>
            <h3 className={styles.sectionTitle}>Images</h3>

            <div className={styles['images-container']}>
                {hasCurrentImages && (
                    <ImageThumbnailsPreview
                        images={images}
                        handleDeleteImage={onDeleteClickOpenConfirmModalHandler}
                    />
                )}

                {!hasCurrentImages && <p>No images have been added yet.</p>}

                <NewImagesShowcase
                    currentImagesHandler={currentImagesHandler}
                    uploadImagesHandler={uploadImagesHandler}
                    isUploading={isUploading}
                    uploadError={uploadError}
                />

                {openModal && (
                    <ConfirmModal
                        actionClickHandler={handleConfirmDelete}
                        onCloseHandler={handleCloseConfirmModal}
                        isLoading={isDeleting}
                    >
                        Are you sure you wanna delete this image?
                    </ConfirmModal>
                )}
            </div>
        </section>
    );
};
