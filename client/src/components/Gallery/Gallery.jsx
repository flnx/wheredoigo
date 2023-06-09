import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';
import { GalleryContextProvider } from './context/GalleryContext';

// Components
import { X } from '@phosphor-icons/react';
import { SecondaryImages } from './components/SecondaryImages/SecondaryImages';
import { MainImage } from './components/MainImage/MainImage';
import { DarkOverlay } from '../DarkOverlay/DarkOverlay';

import styles from './Gallery.module.css';

const propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            imageUrl: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        })
    ).isRequired,
    closeGalleryHandler: PropTypes.func.isRequired,
    alt: PropTypes.string.isRequired,
};

export const Gallery = ({ images, closeGalleryHandler, alt }) => {
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
                <div
                    className={styles.closeIcon}
                    onClick={closeGalleryHandler}
                    tabIndex={0}
                    role={'button'}
                    aria-label={'Close gallery'}
                >
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

Gallery.propTypes = propTypes;
