import { ImageHandler } from './components/ImageHandler';

export const ImagesManager = ({ _id, _id2, imagesData, deleteImageHook, addImageHook }) => {
    const [deleteImage, deleteError, isDeleting] = deleteImageHook(_id, _id2);
    const [uploadImages, uploadError, isUploading] = addImageHook(_id, _id2);

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
