import { memo, useReducer, useState } from 'react';
import { useDeleteDestinationImage } from '../../../../hooks/queries/useDeleteDestinationImage';

// Components
import { ImagesPreviewer } from '../../../../components/ImagesPreviewer/ImagesPreviewer';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';
import { UploadImagesPreview } from '../../../../components/UploadImagesPreview/UploadImagesPreview';

import styles from './EditImages.module.css';
import { imagesReducer, initialState } from '../../../../utils/imagesReducer';

const EditImages = ({ imagesData, destinationId }) => {
    const [deleteImage, isLoading, error] =
        useDeleteDestinationImage(destinationId);
    const [images, setImages] = useState(imagesData);
    const [newImagesState, dispatch] = useReducer(imagesReducer, initialState);
    const [openModal, setOpenModal] = useState(false);
    const [imgIndexToDelete, setImgIndexToDelete] = useState(null);

    const dispatchHandler = (action) => {
        dispatch(action);
    };

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
                    setImages((prevState) =>
                        prevState.filter((img, i) => imgIndexToDelete !== i)
                    );
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

            <ImagesPreviewer
                images={images}
                handleDeleteImage={handleOpenConfirmModal}
            />

            <UploadImagesPreview
                images={newImagesState.imageUrls}
                dispatchHandler={dispatchHandler}
            />
        </>
    );
};

export const MemoizedEditImages = memo(EditImages);
