import { useState, useEffect, useRef } from 'react';

// Components
import { FileInput } from '../../../../components/FileInput/FileInput';
import { ImageCropper } from '../../../../components/Cropper/Cropper';

import styles from './SideNavigation.module.css';

const defaultUserPic = 'https://supercharge.info/images/avatar-placeholder.png';

export const UserAvatar = () => {
    const [image, setImage] = useState('');
    const [imgAfterCrop, setImgAfterCrop] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSaveCancelButtons, setShowSaveCancelButtons] = useState(false);
    const [previousImage, setPreviousImage] = useState('');

    console.log(imgAfterCrop);

    const canvasRef = useRef(null);

    useEffect(() => {
        setPreviousImage(defaultUserPic);
    }, []);

    const onImageSelected = (selectedImg) => {
        setImage(selectedImg);
        setShowModal(true);
        setShowSaveCancelButtons(true);
    };

    const onCropDone = (imgCroppedArea) => {
        const canvasEle = canvasRef.current;
        canvasEle.width = imgCroppedArea.width;
        canvasEle.height = imgCroppedArea.height;

        const context = canvasEle?.getContext('2d');

        const imageObj1 = new Image();
        imageObj1.src = image;

        imageObj1.onload = () => {
            context.drawImage(
                imageObj1,
                imgCroppedArea.x,
                imgCroppedArea.y,
                imgCroppedArea.width,
                imgCroppedArea.height,
                0,
                0,
                imgCroppedArea.width,
                imgCroppedArea.height
            );

            const dataURL = canvasEle.toDataURL('image/jpeg');

            setImgAfterCrop(dataURL);
            setShowModal(false);
        };
    };

    const onCropCancel = () => {
        setShowModal(false);
        setImage('');
        setShowSaveCancelButtons(false);
    };

    const handleSaveButtonClick = async () => {
        try {
            // Convert the base64 image to a Blob object
            const response = await fetch(imgAfterCrop);
            const blob = await response.blob();

            // Create a File object from the Blob
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

            // Create a FormData object and append the File object to it
            const formData = new FormData();
            formData.append('file', file);

            // Make the API request with the FormData object using fetch
            const apiResponse = await fetch('test...', {
                method: 'POST',
                body: formData,
            });

            // Handle the API response
            setPreviousImage(imgAfterCrop);
            setShowSaveCancelButtons(false);
        } catch (error) {
            // Handle the error
        }
    };

    const handleCancelButtonClick = () => {
        setImgAfterCrop(previousImage);
        setShowSaveCancelButtons(false);
    };

    return (
        <header className={styles.userInfo}>
            {showModal && (
                <ImageCropper image={image} onCropDone={onCropDone} onCropCancel={onCropCancel} />
            )}
            <div>
                <img
                    src={imgAfterCrop ? imgAfterCrop : previousImage}
                    alt="User Avatar"
                    className={styles.croppedImg}
                    loading="lazy"
                />
            </div>
            <FileInput setImage={setImage} onImageSelected={onImageSelected} />
            {showSaveCancelButtons && (
                <div>
                    <button className="btn" onClick={handleSaveButtonClick}>
                        Save
                    </button>
                    <button className="btn" onClick={handleCancelButtonClick}>
                        Cancel
                    </button>
                </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </header>
    );
};
