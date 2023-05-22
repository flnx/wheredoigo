import { Heart } from '@phosphor-icons/react';
import styles from './AddToFavorites.module.css';
import { useLikeDestination } from '../../hooks/queries/useLikeDestinations';

export const AddToFavorites = ({ size, _id, isLikedByUser }) => {
    const [sendLike, isLoading, error] = useLikeDestination(_id);

    const onLikeClickHandler = () => {
        if (isLoading) return;
    };

    const onDislikeClickHandler = () => {
        
    }

    return (
        <Heart
            className={styles.icon}
            size={size || 46}
            weight={isLikedByUser ? 'fill' : 'thin'}
        />
    );
};
