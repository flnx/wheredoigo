import { Star } from '@phosphor-icons/react';
import styles from './StarRating.module.css';

export const StarRating = ({ averageRating = 0, size }) => {
    const ratingPoints = new Array(5).fill().map((_, i) => i + 1);
    const rating = Math.round(averageRating);

    return (
        <div className={styles.stars}>
            {ratingPoints.map((starRate) => (
                <Star
                    size={size || 18}
                    weight={rating >= starRate ? 'fill' : 'light'}
                    className={styles.star}
                    key={starRate}
                    aria-label={`Star rating ${rating >= starRate ? 'filled' : 'light'}`}
                />
            ))}
        </div>
    );
};
