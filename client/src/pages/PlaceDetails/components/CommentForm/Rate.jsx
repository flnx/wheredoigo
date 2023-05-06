import { Star } from '@phosphor-icons/react';
import { useState } from 'react';
import styles from './Rate.module.css';

export const Rate = ({ userRating, changeRateHandler, cachedRate, handleRateCache }) => {
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
        </div>
    );
};
