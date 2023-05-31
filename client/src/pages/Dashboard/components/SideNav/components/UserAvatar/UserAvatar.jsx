import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../../../../../context/AuthContext';
import { changeUserAvatar } from '../../../../../../service/data/user';
import { createAvatarImage } from '../../../../../../utils/imagesHandler';

// Components
import { ImageCrop } from '../../../../../../components/ImageCrop/ImageCrop';
import { FileInput } from '../../../../../../components/FileInput/FileInput';
import { CancelButton } from '../../../../../../components/Buttons/Cancel-Button/CancelButton';
import { SuccessButton } from '../../../../../../components/Buttons/Success-Button/SuccessButton';
import { CameraPlus } from '@phosphor-icons/react';

import styles from './UserAvatar.module.css';

export const UserAvatar = () => {
    const [image, setImage] = useState('');
    const [imgAfterCrop, setImgAfterCrop] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSaveCancelButtons, setShowSaveCancelButtons] = useState(false);
    const inputRef = useRef();
    const canvasRef = useRef(null);
    const { auth, setUserData } = useContext(AuthContext);

    const userImage = auth.avatarUrl;

    const onImageSelected = (selectedImg) => {
        setImage(selectedImg);
        setShowModal(true);
        setShowSaveCancelButtons(true);
    };
    
    const handleSaveButtonClick = async () => {
        try {
            // Convert the image to a Blob object
            const formData = await createAvatarImage(imgAfterCrop);
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

    const afterCropHandler = (dataURL) => setImgAfterCrop(dataURL);
    const showModalHandler = (bool) => setShowModal(bool);
    const imageHandler = (img) => setImage(img);
    const saveCancelButtonsHandler = (bool) => setShowSaveCancelButtons(bool);

    return (
        <header className={styles.userInfo}>
            {showModal && (
                <ImageCrop
                    image={image}
                    canvasRef={canvasRef}
                    afterCropHandler={afterCropHandler}
                    showModalHandler={showModalHandler}
                    imageHandler={imageHandler}
                    saveCancelButtonsHandler={saveCancelButtonsHandler}
                />
            )}
            <div className={styles.avatarContainer}>
                <img
                    src={imgAfterCrop ? imgAfterCrop : userImage}
                    alt="User Avatar"
                    className={styles.avatar}
                    loading="lazy"
                />
                <div className={styles.iconContainer}>
                    <CameraPlus
                        size={25}
                        className={styles.cameraIcon}
                        onClick={() => inputRef.current.click()}
                    />
                </div>
            </div>
            <FileInput onImageSelected={onImageSelected} inputRef={inputRef} />
            {showSaveCancelButtons && (
                <div className={styles.buttons}>
                    <SuccessButton onClickHandler={handleSaveButtonClick}>Save</SuccessButton>
                    <CancelButton onClickHandler={handleCancelButtonClick}>
                        Cancel
                    </CancelButton>
                </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </header>
    );
};