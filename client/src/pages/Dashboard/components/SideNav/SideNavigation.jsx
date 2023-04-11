import { NavLink } from 'react-router-dom';

// Components
import { FileInput } from '../../../../components/FileInput/FileInput';
import { ImageCropper } from '../../../../components/Cropper/Cropper';

import styles from './SideNavigation.module.css';
import { useState } from 'react';
const userURL = 'https://randomuser.me/api/portraits/women/28.jpg';

export const SideNavigation = () => {
    const [image, setImage] = useState('');
    const [currentPage, setCurrentPage] = useState('choose-img');
    const [imgAfterCrop, setImgAfterCrop] = useState('');

    // Invoked when new image file is selected
    const onImageSelected = (selectedImg) => {
        setImage(selectedImg);
        setCurrentPage('crop-img');
    };

    // Generating Cropped Image When Done Button Clicked
    const onCropDone = (imgCroppedArea) => {
        const canvasEle = document.createElement('canvas');
        canvasEle.width = imgCroppedArea.width;
        canvasEle.height = imgCroppedArea.height;

        const context = canvasEle.getContext('2d');

        let imageObj1 = new Image();
        imageObj1.src = image;
        imageObj1.onload = function () {
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
            setCurrentPage('img-cropped');
        };
    };

    // Handle Cancel Button Click
    const onCropCancel = () => {
        setCurrentPage('choose-img');
        setImage('');
    };
    return (
        <div className={styles.sideNav}>
            <header className={styles.userInfo}>
                {currentPage === 'choose-img' ? (
                    <FileInput setImage={setImage} onImageSelected={onImageSelected} />
                ) : currentPage === 'crop-img' ? (
                    <ImageCropper
                        image={image}
                        onCropDone={onCropDone}
                        onCropCancel={onCropCancel}
                    />
                ) : (
                    <div>
                        <div>
                            <img src={imgAfterCrop} className={styles.croppedImg} />
                        </div>

                        <button
                            onClick={() => {
                                setCurrentPage('crop-img');
                            }}
                            className="btn"
                        >
                            Crop
                        </button>

                        <button
                            onClick={() => {
                                setCurrentPage('choose-img');
                                setImage('');
                            }}
                            className="btn"
                        >
                            New Image
                        </button>
                    </div>
                )}
            </header>

            <nav className={styles.navbar}>
                <NavLink to="add" className={styles.navLink}>
                    Add Destination
                </NavLink>
                <NavLink to="" className={styles.navLink}>
                    My Trips
                </NavLink>
                <NavLink to="followers" className={styles.navLink}>
                    Followers
                </NavLink>
                <NavLink to="history" className={styles.navLink}>
                    History
                </NavLink>
                <NavLink to="settings" className={styles.navLink}>
                    Settings
                </NavLink>
            </nav>
        </div>
    );
};
