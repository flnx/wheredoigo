import { memo, useReducer, useState } from 'react';
import { useDeleteDestinationImage } from '../../../../hooks/queries/useDeleteDestinationImage';
import { useAddDestinationNewImages } from '../../../../hooks/queries/useAddDestinationNewImages';
import { imagesReducer, initialState } from '../../../../utils/imagesReducer';
import { createImagesFormData } from '../../../../utils/formData';

// Components
import { ImagesPreviewer } from '../../../../components/ImagesPreviewer/ImagesPreviewer';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';
import { UploadImagesPreview } from '../../../../components/UploadImagesPreview/UploadImagesPreview';
import { SuccessButton } from '../../../../components/Buttons/Success-Button/SuccessButton';

import styles from './EditImages.module.css';

const EditImages = ({ imagesData, destinationId }) => {
    const [deleteImage, error, isLoading] = useDeleteDestinationImage(destinationId);

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
                    setImages((prevState) =>
                        prevState.filter((img, i) => imgIndexToDelete !== i)
                    );
                    setOpenModal(false);
                },
                onError: () => {
                    setOpenModal(false);
                },
            }
        );
    };

    const handleUpdateCurrentImages = (updatedImages) => {
        setImages(updatedImages);
    };

    const hasCurrentImages = images.length > 0;

    return (
        <>
            {hasCurrentImages && (
                <ImagesPreviewer images={images} handleDeleteImage={handleOpenConfirmModal} />
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
        </>
    );
};

const NewImagesUploader = ({ currentImagesHandler, destinationId }) => {
    const [uploadImages, error, isLoading] = useAddDestinationNewImages(destinationId);
    const [newImagesState, dispatch] = useReducer(imagesReducer, initialState);

    const dispatchHandler = (action) => {
        dispatch(action);
    };

    const handleNewImagesSubmit = async (e) => {
        e.preventDefault();

        if (!hasNewlyUploadImages || isLoading) return;

        const formData = await createImagesFormData(newImagesState);

        uploadImages(formData, {
            onSuccess: (result) => {
                dispatch({ type: 'reset' });
                currentImagesHandler(result.imageUrls);
            },
            onError: (e) => {
                dispatch({ type: 'reset' });
            },
        });
    };

    const hasNewlyUploadImages = newImagesState.imageUrls.length > 0;

    return (
        <div className={styles['newly-uploaded-images']}>
            {error && (
                <span className={styles.uploadError}>
                    Sorry, there was an error during the upload process. Please try again
                    later.
                </span>
            )}

            <UploadImagesPreview
                images={newImagesState.imageUrls}
                dispatchHandler={dispatchHandler}
            />

            {hasNewlyUploadImages && (
                <SuccessButton onClickHandler={handleNewImagesSubmit} isLoading={isLoading}>
                    Add
                </SuccessButton>
            )}
        </div>
    );
};

export const MemoizedEditImages = memo(EditImages);
