import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';

// Context
import { GalleryContextProvider } from './context/GalleryContext';

// Components
import { X } from '@phosphor-icons/react';
import { SecondaryImages } from './components/SecondaryImages/SecondaryImages';
import { MainImage } from './components/MainImage/MainImage';
import { DarkOverlay } from '../DarkOverlay/DarkOverlay';

import styles from './Gallery.module.css';

export const Gallery = ({ images = [], closeGalleryHandler, alt }) => {
    if (images.length == 0) {
        return null;
    }

    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);

    return (
        <section>
            <DarkOverlay onClickHandler={closeGalleryHandler} />
            <div className={styles.wrapper}>
                <div className={styles.xIcon} onClick={closeGalleryHandler} tabIndex={0}>
                    <X size={30} />
                </div>
                <GalleryContextProvider
                    images={images}
                    closeGalleryHandler={closeGalleryHandler}
                    alt={alt}
                >
                    <div className={styles.imagesContainer}>
                        <MainImage />
                        <SecondaryImages />
                    </div>
                </GalleryContextProvider>
            </div>
        </section>
    );
};
