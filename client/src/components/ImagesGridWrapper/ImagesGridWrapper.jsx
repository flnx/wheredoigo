import PropTypes from 'prop-types';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { checkArrayAndPreloadElements } from 'src/utils/utils';

// Components
import { MainImage } from './compoonents/MainImage/MainImage';
import { SecondaryImages } from './compoonents/SecondaryImages/SecondaryImages';
import { ShowImagesButton } from './compoonents/ShowImagesButton/ShowImagesButton';

import styles from './ImagesGridWrapper.module.css';

const propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            imageUrl: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        })
    ).isRequired,
    onClickHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    alt: PropTypes.string,
};

export const ImagesGridWrapper = ({ images, alt, onClickHandler, isLoading }) => {
    const screenWidth = useWindowSize();
    const isDesktop = screenWidth >= 798;

    // If data is loading - it returns a new array with 5 elements
    // This ensures that the loading skeletons will be rendered instead of the 5 showcase images
    const imagesArr = checkArrayAndPreloadElements(images, 5);

    const mainImage = imagesArr[0];
    
    const secondaryImages = imagesArr.slice(1, 5);

    return (
        <div className={styles['images']}>
            <MainImage
                onClickHandler={onClickHandler}
                mainImage={mainImage}
                isLoading={isLoading}
                alt={alt}
            />

            {isDesktop && (
                <SecondaryImages
                    onClickHandler={onClickHandler}
                    secondaryImages={secondaryImages}
                    isLoading={isLoading}
                    alt={alt}
                />
            )}

            {!isLoading && (
                <ShowImagesButton onClickHandler={onClickHandler} mainImage={mainImage} />
            )}
        </div>
    );
};

ImagesGridWrapper.propTypes = propTypes;
