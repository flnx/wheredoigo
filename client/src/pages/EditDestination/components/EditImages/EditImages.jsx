import { memo, useState } from 'react';
import { useDeleteDestinationImage } from '../../../../hooks/queries/useDeleteDestinationImage';

// Components
import { ImagesPreviewer } from '../../../../components/ImagesPreviewer/ImagesPreviewer';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';

import styles from './EditImages.module.css';

const EditImages = ({ imagesData, destinationId }) => {
    const [deleteImage, isLoading, error] = useDeleteDestinationImage(destinationId);
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
        const imgId = images[imgIndexToDelete]._id;

        deleteImage(
            { imgId },
            {
                onSuccess: () => {
                    setImages((prevState) => prevState.filter((img, i) => imgIndexToDelete !== i));
                    setOpenModal(false);
                },
                onError: () => {
                    setOpenModal(false);
                    // add error notification
                },
            }
        );
    };

    return (
        <>
            {openModal && (
                <ConfirmModal
                    actionClickHandler={handleConfirmDelete}
                    onCloseHandler={handleCloseConfirmModal}
                    isLoading={isLoading}
                >
                    Are you sure you wanna delete this image?
                </ConfirmModal>
            )}

            <ImagesPreviewer images={images} handleDeleteImage={handleOpenConfirmModal} />
        </>
    );
};

export const MemoizedEditImages = memo(EditImages);
