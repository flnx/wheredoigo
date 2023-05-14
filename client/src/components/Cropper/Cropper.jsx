import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { OverlayDisabledBodyScroll } from '../OverlayDisabledBodyScroll/OverlayDisabledBodyScroll';

import styles from './Cropper.module.css';
import { CancelButton } from '../Buttons/Cancel-Button/CancelButton';
import { SuccessButton } from '../Buttons/Success-Button/SuccessButton';

export const ImageCropper = ({ image, onCropDone, onCropCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
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
                <CancelButton onClickHandler={onCropCancel}>
                    Cancel
                </CancelButton>
                <SuccessButton onClickHandler={() => onCropDone(croppedArea)}>
                    Done
                </SuccessButton>
            </div>
        </OverlayDisabledBodyScroll>
    );
};
