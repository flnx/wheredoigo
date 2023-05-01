import { Star } from '@phosphor-icons/react';
import styles from './StarRating.module.css';

export const StarRating = ({ rating }) => {
    return (
        <div className={styles.rating}>
            <Star size={24} />
            <span>{rating || 0}</span>
        </div>
    );
};
