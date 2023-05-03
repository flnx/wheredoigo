import { useState } from 'react';

// Components
import { ConfirmModal } from '../../ConfirmModal/ConfirmModal';
import { ImageThumbnailsPreview } from '../../ImageThumbnailsPreview/ImageThumbnailsPreview';

import styles from './ImageHandler.module.css';

export const ImageHandler = ({ imagesData, deleteImageHandler, isDeleting }) => {
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
        const imgId = imagesData[imgIndexToDelete]._id;
        deleteImageHandler({ imgId }, handleCloseConfirmModal);
    };

    const hasCurrentImages = imagesData.length > 0;

    return (
        <div>
            <h3 className={styles.sectionTitle}>Images</h3>
            {hasCurrentImages && (
                <ImageThumbnailsPreview
                    images={imagesData}
                    handleDeleteImage={onDeleteClickOpenConfirmModalHandler}
                />
            )}

            {!hasCurrentImages && <p>No images have been added yet.</p>}

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
    );
};
