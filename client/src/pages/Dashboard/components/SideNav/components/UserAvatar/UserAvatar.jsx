import { useState, useRef, useContext } from 'react';

// React Query Hooks
import { useChangeUserAvatar } from 'src/hooks/queries/useChangeUserAvatar';

// Auth Context
import { AuthContext } from 'src/context/AuthContext';

// Utils
import { createAvatarImage } from 'src/utils/imagesHandler';

// Global Components
import { CameraPlus } from '@phosphor-icons/react';
import { ImageCrop } from 'src/components/ImageCrop/ImageCrop';
import { FileInput } from 'src/components/FileInput/FileInput';
import { CancelButton } from 'src/components/Buttons/Cancel-Button/CancelButton';
import { SuccessButton } from 'src/components/Buttons/Success-Button/SuccessButton';
import { DarkOverlay } from 'src/components/DarkOverlay/DarkOverlay';
import { ServerErrorPopUp } from 'src/components/ServerErrorPopUp/ServerErrorPopUp';

import styles from './UserAvatar.module.css';

export const UserAvatar = () => {
    const [image, setImage] = useState('');
    const [imgAfterCrop, setImgAfterCrop] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSaveCancelButtons, setShowSaveCancelButtons] = useState(false);
    const [changeAvatar, isLoading, error] = useChangeUserAvatar();
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
        const formData = await createAvatarImage(imgAfterCrop);

        changeAvatar(formData, {
            onSuccess: (updatedUserData) => {
                setUserData(updatedUserData);
                setShowSaveCancelButtons(false);
            },
            onError: () => {
                setImgAfterCrop('');
                setShowSaveCancelButtons(false);
            },
        });
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
            {isLoading && <DarkOverlay isLoading={isLoading} />}
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
                    <SuccessButton
                        onClickHandler={handleSaveButtonClick}
                        isLoading={isLoading}
                    >
                        Save
                    </SuccessButton>
                    <CancelButton
                        onClickHandler={handleCancelButtonClick}
                        isLoading={isLoading}
                    >
                        Cancel
                    </CancelButton>
                </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {error && <ServerErrorPopUp errorMessage={error} />}
        </header>
    );
};
