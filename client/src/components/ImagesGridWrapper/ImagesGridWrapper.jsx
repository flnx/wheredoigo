import PropTypes from 'prop-types';
import { useWindowSize } from '../../hooks/useWindowSize';
import { checkArrayAndPreloadElements } from '../../utils/utils';

// Components
import { Image } from '@phosphor-icons/react';
import { LoadingSkeleton } from '../LoadingSkeletons/LoadingSkeleton';

import styles from './ImagesGridWrapper.module.css';

const propTypes = {
    images: PropTypes.array.isRequired,
    alt: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

export const ImagesGridWrapper = ({ images, alt, onClickHandler, isLoading }) => {
    const screenWidth = useWindowSize();
    const isDesktop = screenWidth >= 798;

    // If data is loading - it returns a new array with X elements
    // This ensures that the loading skeleton will be rendered with X amount of div boxes during fetching
    const imagesArr = checkArrayAndPreloadElements(images, 5);

    const mainImage = imagesArr[0];
    const secondaryImages = imagesArr.slice(1);

    return (
        <div className={styles['images']}>
            <div className={styles.mainImgContainer}>
                {isLoading
                    ? <div className={styles.loading}>
                        <LoadingSkeleton />
                    </div>
                    : <img
                        className={styles.mainImg}
                        src={mainImage.imageUrl}
                        alt={alt}
                        onClick={() => onClickHandler(mainImage)}
                    />
                }
            </div>
            {isDesktop && (
                <div className={styles.secondaryImages}>
                    {secondaryImages.map((x) => (
                        isLoading
                            ? <div className={styles.loading}>
                                <LoadingSkeleton key={x._id} />
                            </div>
                            : <img
                                src={x.imageUrl}
                                alt={alt}
                                onClick={() => onClickHandler(x)}
                                key={x._id}
                            />
                    ))}
                </div>
            )}
            {!isLoading && <div className={styles['show-all-btn']}>
                <button className={styles.btn} onClick={() => onClickHandler(mainImage)}>
                    <span className={styles.imgIcon}>
                        <Image size={20} />
                    </span>
                    <span>Show all images</span>
                </button>
            </div>}
        </div>
    );
};

ImagesGridWrapper.propTypes = propTypes;