import { Star } from '@phosphor-icons/react';
import styles from './Rate.module.css';
import { useState } from 'react';

export const Rate = () => {
    const [rateByUser, setRateByUser] = useState(0);
    const [cachedRate, setCachedRate] = useState(rateByUser);
    const [hovered, setHovered] = useState(false);

    const onStarClickHandler = (rating) => {
        setRateByUser(rating);
        setCachedRate(rating);
    };

    const onRatingHover = (rating) => {
        setRateByUser(rating);
        setHovered(rating);
    };

    const onRatingUnhover = () => {
        setRateByUser(cachedRate);
        setHovered(false);
    };

    const ratingPoints = new Array(5).fill().map((_, i) => i + 1);

    return (
        <div>
            {ratingPoints.map((rate) => (
                <Star
                    size={28}
                    key={rate}
                    onClick={() => onStarClickHandler(rate)}
                    className={`${styles.star} ${hovered &&  rateByUser >= rate? styles.hovered : ''}`}
                    weight={rateByUser >= rate ? 'fill' : 'light'}
                    onMouseEnter={() => onRatingHover(rate)}
                    onMouseLeave={onRatingUnhover}
                />
            ))}
        </div>
    );
};
