import { memo, useReducer, useState } from 'react';
import { useDeleteDestinationImage } from '../../../../hooks/queries/useDeleteDestinationImage';

// Components
import { ImagesPreviewer } from '../../../../components/ImagesPreviewer/ImagesPreviewer';
import { ConfirmModal } from '../../../../components/ConfirmModal/ConfirmModal';
import { UploadImagesPreview } from '../../../../components/UploadImagesPreview/UploadImagesPreview';

import { imagesReducer, initialState } from '../../../../utils/imagesReducer';

import { createImagesFormData } from '../../../../utils/formData';
import { useAddDestinationNewImages } from '../../../../hooks/queries/useAddDestinationNewImages';
import { SuccessButton } from '../../../../components/Buttons/Success-Button/SuccessButton';

import styles from './EditImages.module.css';

const EditImages = ({ imagesData, destinationId }) => {
    const [deleteImage, deleteError, isDeleteLoading] =useDeleteDestinationImage(destinationId);
    const [uploadImages, uploadError, isUploadLoading] =useAddDestinationNewImages(destinationId);

    const [images, setImages] = useState(imagesData);
    const [newImagesState, dispatch] = useReducer(imagesReducer, initialState);
    const [openModal, setOpenModal] = useState(false);
    const [imgIndexToDelete, setImgIndexToDelete] = useState(null);

    const hasCurrentImages = images.length > 0;
    const hasNewlyUploadImages = newImagesState.imageUrls.length > 0;

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
        deleteImage({ imgId },
            {
                onSuccess: () => {
                    setImages((prevState) => prevState.filter((img, i) => imgIndexToDelete !== i));
                    setOpenModal(false);
                },
                onError: () => {
                    setOpenModal(false);
                },
            }
        );
    };

    const handleNewImagesSubmit = async (e) => {
        e.preventDefault();

        if (!hasNewlyUploadImages || isUploadLoading) return;

        const formData = await createImagesFormData(newImagesState);

        uploadImages(formData, {
            onSuccess: (result) => {
                dispatch({ type: 'reset' });
                setImages(result.imageUrls);
            }, 
            onError: (e) => {
                dispatch({ type: 'reset' });
            }
        });
    };

    return (
        <>
            <div className={styles['current-images']}>
                {hasCurrentImages ? (
                    <ImagesPreviewer
                        images={images}
                        handleDeleteImage={handleOpenConfirmModal}
                    />
                ) : (
                    <p>You haven't added any images yet</p>
                )}
            </div>

            <div className={styles['uploaded-images']}>
                {uploadError && (
                    <span className={styles.uploadError}>
                        Sorry, there was an error during the upload process.
                        Please try again later.
                    </span>
                )}

                <UploadImagesPreview
                    images={newImagesState.imageUrls}
                    dispatchHandler={dispatchHandler}
                />
            </div>

            {hasNewlyUploadImages && (
                <SuccessButton
                    onClickHandler={handleNewImagesSubmit}
                    isLoading={isUploadLoading}
                >
                    Add
                </SuccessButton>
            )}

            {openModal && (
                <ConfirmModal
                    actionClickHandler={handleConfirmDelete}
                    onCloseHandler={handleCloseConfirmModal}
                    isLoading={isDeleteLoading}
                >
                    Are you sure you wanna delete this image?
                </ConfirmModal>
            )}
        </>
    );
};

export const MemoizedEditImages = memo(EditImages);
