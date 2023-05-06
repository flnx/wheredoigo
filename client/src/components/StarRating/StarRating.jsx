import { Star } from '@phosphor-icons/react';
import styles from './StarRating.module.css';

export const StarRating = ({ rating }) => {
    const ratingPoints = new Array(5).fill().map((_, i) => i + 1);

    return (
        <div className={styles.stars}>
            {ratingPoints.map((starRate) => (
                <Star
                    size={18}
                    weight={rating >= starRate ? 'fill' : 'light'}
                    className={styles.star}
                />
            ))}
        </div>
    );
};
