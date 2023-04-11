import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Overlay } from '../Overlay/Overlay';

import styles from './Cropper.module.css';

export const ImageCropper = ({ image, onCropDone, onCropCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    return (
        <Overlay closeModalHandler={onCropCancel}>
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

            <div styles={styles.actionBtns}>
                <button className="btn btn-outline" onClick={onCropCancel}>
                    Cancel
                </button>

                <button className="btn" onClick={() => onCropDone(croppedArea)}>
                    Done
                </button>
            </div>
        </Overlay>
    );
};
