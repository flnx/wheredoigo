import { useState, useEffect, useRef, useContext } from 'react';

// Components
import { FileInput } from '../../../../components/FileInput/FileInput';
import { ImageCropper } from '../../../../components/Cropper/Cropper';

import styles from './SideNavigation.module.css';
import { changeUserAvatar } from '../../../../service/data/user';
import { AuthContext } from '../../../../context/AuthContext';

export const UserAvatar = () => {
    const [image, setImage] = useState('');
    const [imgAfterCrop, setImgAfterCrop] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSaveCancelButtons, setShowSaveCancelButtons] = useState(false);
    const { auth, setUserData } = useContext(AuthContext);
    const canvasRef = useRef(null);

    const userImage = auth.avatarUrl;

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
            // Convert the image to a Blob object
            const response = await fetch(imgAfterCrop);
            const blob = await response.blob();

            // Create a File object from the Blob
            const image = new File([blob], 'image.jpg', { type: 'image/jpeg' });

            // Create a FormData object and append the File object to it
            const formData = new FormData();
            formData.append('avatarUrl', image, 'avatar.jpg');

            const updatedUserData = await changeUserAvatar(formData);
            setUserData(updatedUserData);
            setShowSaveCancelButtons(false);
        } catch (error) {
            setImgAfterCrop('');
            setShowSaveCancelButtons(false);
        }
    };

    const handleCancelButtonClick = () => {
        setImgAfterCrop(userImage);
        setShowSaveCancelButtons(false);
    };

    return (
        <header className={styles.userInfo}>
            {showModal && (
                <ImageCropper image={image} onCropDone={onCropDone} onCropCancel={onCropCancel} />
            )}
            <div>
                <img
                    src={imgAfterCrop ? imgAfterCrop : userImage}
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
