import { memo, useState } from 'react';

// Components
import { ImagesPreviewer } from '../../../../components/ImagesPreviewer/ImagesPreviewer';

import styles from './EditImages.module.css';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';

const EditImages = ({ imagesData }) => {
    const [images, setImages] = useState(imagesData);
    const [openModal, setOpenModal] = useState(false);
    const [imgIndexToDelete, setImgIndexToDelete] = useState(null);

    const handleOpenConfirmModal = (index) => {
        setOpenModal(true);
        setImgIndexToDelete(index);
    };

    const handleCloseConfirmModal = () => {
        setOpenModal(false);
        setImgIndexToDelete(null);
    };

    const handleConfirmDelete = () => {
        setImages((prevState) => prevState.filter((img, i) => imgIndexToDelete !== i));
        setOpenModal(false);
    };

    return (
        <>
            {openModal && (
                <ConfirmModal
                    actionClickHandler={handleConfirmDelete}
                    onCloseHandler={handleCloseConfirmModal}
                >
                    Are you sure you wanna delete this image?
                </ConfirmModal>
            )}

            <ImagesPreviewer images={images} handleDeleteImage={handleOpenConfirmModal} />
        </>
    );
};

export const MemoizedEditImages = memo(EditImages);
