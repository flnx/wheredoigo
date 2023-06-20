import PropTypes from 'prop-types';
import { useState } from 'react';
import { checkArrayAndPreloadElements } from '../../../utils/utils';

// Components
import { ConfirmModal } from '../../ConfirmModal/ConfirmModal';
import { ImageThumbnailsPreview } from '../../ImageThumbnailsPreview/ImageThumbnailsPreview';
import { TextWrap } from '../../TextWrap/TextWrap';

const propTypes = {
    imagesData: PropTypes.array.isRequired,
    deleteImageHandler: PropTypes.func.isRequired,
    isDeleting: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export const ImageHandler = ({ imagesData, deleteImageHandler, isDeleting, isLoading }) => {
    const [openModal, setOpenModal] = useState(false);
    const [imgIndexToDelete, setImgIndexToDelete] = useState(null);

    const onDeleteClickOpenConfirmModalHandler = (_, index) => {
        if (isLoading) return;
        setOpenModal(true);
        setImgIndexToDelete(index);
    };

    const handleCloseConfirmModal = () => {
        if (isDeleting) return;
        setOpenModal(false);
        setImgIndexToDelete(null);
    };

    const handleConfirmDelete = () => {
        const imgId = imagesData[imgIndexToDelete]._id;
        deleteImageHandler({ imgId }, handleCloseConfirmModal);
    };

    // Prefills the array with data in order to render 6 elements for the loading skeleton to show during loading
    const images = isLoading ? checkArrayAndPreloadElements([], 6) : imagesData;
    const doesNotHaveCurrentImages = images.length == 0;

    return (
        <div>
            <h3 className="mb-2">
                <TextWrap isLoading={isLoading} content={'Images'} />
            </h3>
            <ImageThumbnailsPreview
                images={images}
                handleDeleteImage={onDeleteClickOpenConfirmModalHandler}
                isLoading={isLoading}
                alt={'Uploaded'}
            />

            {doesNotHaveCurrentImages && <p>No images have been added yet.</p>}

            {openModal && (
                <ConfirmModal
                    actionClickHandler={handleConfirmDelete}
                    onCloseHandler={handleCloseConfirmModal}
                    isLoading={isDeleting}
                >
                    Are you sure you want to delete this image?
                </ConfirmModal>
            )}
        </div>
    );
};

ImageHandler.propTypes = propTypes;
