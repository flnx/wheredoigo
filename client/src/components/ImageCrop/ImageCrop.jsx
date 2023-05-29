import { useState } from 'react';

// Components
import Cropper from 'react-easy-crop';
import { OverlayDisabledBodyScroll } from '../OverlayDisabledBodyScroll/OverlayDisabledBodyScroll';
import { SuccessButton } from '../Buttons/Success-Button/SuccessButton';
import { CancelButton } from '../Buttons/Cancel-Button/CancelButton';

import styles from './ImageCrop.module.css';

export const ImageCrop = ({
    image,
    canvasRef,
    afterCropHandler,
    showModalHandler,
    imageHandler,
    saveCancelButtonsHandler,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
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

            afterCropHandler(dataURL);
            showModalHandler(false);
        };
    };

    const onCropCancel = () => {
        showModalHandler(false);
        imageHandler('');
        saveCancelButtonsHandler(false);
    };

    return (
        <OverlayDisabledBodyScroll closeModalHandler={onCropCancel}>
            <div className={styles.cropper}>
                <Cropper
                    image={image}
                    aspect={1 / 1}
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
            </div>

            <div className={styles.actionBtns}>
                <CancelButton onClickHandler={onCropCancel}>Cancel</CancelButton>
                <SuccessButton onClickHandler={() => onCropDone(croppedArea)}>
                    Done
                </SuccessButton>
            </div>
        </OverlayDisabledBodyScroll>
    );
};
