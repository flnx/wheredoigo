
import { useDeleteDestinationImage } from '../../../../hooks/queries/useDeleteDestinationImage';
import { useAddDestinationNewImages } from '../../../../hooks/queries/useAddDestinationNewImages';

import { ImagesHandler } from '../../../../components/ImagesHandler/ImagesHandler';

// Components

export const EditImages = ({ imagesData, destinationId }) => {
    const [deleteImage, deleteError, isDeleting] = useDeleteDestinationImage(destinationId);
    const [uploadImages, uploadError, isUploading] = useAddDestinationNewImages(destinationId);

    const deleteImageHandler = (imgId, cbSetImages) => {
        deleteImage(imgId, {
            onSuccess: () => cbSetImages(),
        });
    };

    const uploadImagesHandler = (formData, currentImagesHandler, cbDispatch) => {
        uploadImages(formData, {
            onSuccess: (result) => {
                cbDispatch();
                currentImagesHandler(result.imageUrls);
            },
            onError: () => {
                cbDispatch();
            },
        });
    };

    return (
        <ImagesHandler
            imagesData={imagesData}
            uploadImagesHandler={uploadImagesHandler}
            deleteImageHandler={deleteImageHandler}
            deleteError={deleteError}
            uploadError={uploadError}
            isUploading={isUploading}
            isDeleting={isDeleting}
        />
    );
};
