import { Star } from '@phosphor-icons/react';
import styles from './StarRating.module.css';

export const StarRating = ({ averageRating }) => {
    const ratingPoints = new Array(5).fill().map((_, i) => i + 1);

    const rating = Math.round(averageRating);

    return (
        <div className={styles.stars}>
            {ratingPoints.map((starRate) => (
                <Star
                    size={18}
                    weight={rating >= starRate ? 'fill' : 'light'}
                    className={styles.star}
                    key={starRate}
                />
            ))}
        </div>
    );
};
