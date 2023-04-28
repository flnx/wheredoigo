import { memo, useState } from 'react';

// Components
import { ImagesPreviewer } from '../../../../components/ImagesPreviewer/ImagesPreviewer';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';
import { NewImagesUploader } from './NewImagesUploader';

import styles from './EditImages.module.css';

const EditImages = ({ imagesData, destinationId, deleteImageHandler, isLoading }) => {
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

    const handleUpdateCurrentImages = (newImages) => {
        setImages((prevState) => [...prevState, ...newImages]);
    };

    const hasCurrentImages = images.length > 0;

    return (
        <section>
            <h3 className={styles.sectionTitle}>Images</h3>

            <div className={styles['images-container']}>
                {hasCurrentImages && (
                    <ImagesPreviewer
                        images={images}
                        handleDeleteImage={onDeleteClickOpenConfirmModalHandler}
                    />
                )}

                {!hasCurrentImages && <p>No images have been added yet.</p>}

                <NewImagesUploader
                    currentImagesHandler={handleUpdateCurrentImages}
                    destinationId={destinationId}
                />

                {openModal && (
                    <ConfirmModal
                        actionClickHandler={handleConfirmDelete}
                        onCloseHandler={handleCloseConfirmModal}
                        isLoading={isLoading}
                    >
                        Are you sure you wanna delete this image?
                    </ConfirmModal>
                )}
            </div>
        </section>
    );
};

export const MemoizedEditImages = memo(EditImages);
