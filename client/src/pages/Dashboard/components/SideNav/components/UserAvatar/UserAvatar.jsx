import { useState, useRef, useContext } from 'react';
import { useChangeUserAvatar } from '../../../../../../hooks/queries/useChangeUserAvatar';
import { AuthContext } from '../../../../../../context/AuthContext';
import { createAvatarImage } from '../../../../../../utils/imagesHandler';

// Components
import { ImageCrop } from '../../../../../../components/ImageCrop/ImageCrop';
import { FileInput } from '../../../../../../components/FileInput/FileInput';
import { CancelButton } from '../../../../../../components/Buttons/Cancel-Button/CancelButton';
import { SuccessButton } from '../../../../../../components/Buttons/Success-Button/SuccessButton';
import { CameraPlus } from '@phosphor-icons/react';
import { DarkOverlay } from '../../../../../../components/DarkOverlay/DarkOverlay';
import { ServerErrorPopUp } from '../../../../../../components/ServerErrorPopUp/ServerErrorPopUp';

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
