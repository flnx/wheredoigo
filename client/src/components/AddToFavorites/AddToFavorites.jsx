import { Heart } from '@phosphor-icons/react';
import styles from './AddToFavorites.module.css';

export const AddToFavorites = ({ size, _id, isLikedByUser }) => {
    return (
        <Heart 
            className={styles.icon} 
            size={size || 46} 
            weight={isLikedByUser ? 'fill' : 'thin'} 
        />
    );
};
