import { useState } from 'react';
import { Star } from '@phosphor-icons/react';
import { ShowFormError } from 'src/components/ShowFormError/ShowFormError';
import styles from './Rate.module.css';

export const Rate = ({
    userRating,
    changeRateHandler,
    cachedRate,
    handleRateCache,
    errors,
}) => {
    const [hovered, setHovered] = useState(false);

    const onStarClickHandler = (rating) => {
        changeRateHandler(rating);
        handleRateCache(rating);
        setHovered(false);
    };

    const onRatingHover = (rating) => {
        changeRateHandler(rating);
        setHovered(rating);
    };

    const onRatingUnhover = () => {
        changeRateHandler(cachedRate);
        setHovered(false);
    };

    const ratingPoints = new Array(5).fill().map((_, i) => i + 1);
    const isNotRated = cachedRate == 0 && errors.some((err) => err.includes('rate'));

    return (
        <div className={styles.stars}>
            {ratingPoints.map((rate) => (
                <Star
                    size={28}
                    key={rate}
                    onClick={() => onStarClickHandler(rate)}
                    className={`${styles.star} ${
                        hovered && userRating >= rate ? `${styles.hovered}` : ''
                    }`}
                    weight={userRating >= rate ? 'fill' : 'light'}
                    onMouseEnter={() => onRatingHover(rate)}
                    onMouseLeave={onRatingUnhover}
                />
            ))}

            {isNotRated && (
                <div>
                    <ShowFormError errors={errors} errorParam={'rate'} />
                </div>
            )}
        </div>
    );
};
