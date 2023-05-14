import { useWindowSize } from '../../hooks/useWindowSize';

// Components
import { Image } from '@phosphor-icons/react';
import { LoadingSkeleton } from '../LoadingSkeletons/LoadingSkeleton';

import styles from './ImagesGridWrapper.module.css';
import { checkArrayAndPreloadElements } from '../../utils/utils';

export const ImagesGridWrapper = ({ images, alt, onClickHandler, isLoading }) => {
    const screenWidth = useWindowSize();
    const isDesktop = screenWidth >= 798;

    // 1. If data is loading - it returns a new array with X elements
    // 1.1 This ensures that the section will render (X) amount of div boxes when the data is being fetched in order the loading skeleton to visualize inside them
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
