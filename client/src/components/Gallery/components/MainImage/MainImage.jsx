// Components
import { LeftArrow } from '../Arrows/LeftArrow';
import { RightArrow } from '../Arrows/RightArrow';

import styles from './MainImage.module.css';

export const MainImage = ({
    images,
    currentIndex,
    onLeftArrowClickHandler,
    onRightArrowClickHandler,
    alt
}) => {
    const isFirstImage = currentIndex == 0;
    const isLastImage = currentIndex == images.length - 1;
    const mainImage = images[currentIndex];

    return (
        <div className={styles.mainImgContainer}>
            {!isFirstImage &&
                <LeftArrow onClickHandler={onLeftArrowClickHandler} />
            }
            <img
                src={mainImage.imageUrl}
                alt={alt || "image"}
                className={styles.mainImg}
            />
            {!isLastImage &&
                <RightArrow onClickHandler={onRightArrowClickHandler} />
            }
        </div>
    )
}
