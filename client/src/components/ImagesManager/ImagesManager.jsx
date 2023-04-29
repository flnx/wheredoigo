import { ImageHandler } from './components/ImageHandler';

export const ImagesManager = ({ imagesData, destinationId, deleteImageHook, addImageHook }) => {
    const [deleteImage, deleteError, isDeleting] = deleteImageHook(destinationId);
    const [uploadImages, uploadError, isUploading] = addImageHook(destinationId);

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
        <ImageHandler
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
