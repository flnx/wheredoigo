import { Heart } from '@phosphor-icons/react';
import styles from './AddToFavorites.module.css';
import { useLikeDestination } from '../../hooks/queries/useLikeDestinations';

export const AddToFavorites = ({ size, _id, isLikedByUser }) => {
    const [sendLike, isLoading, error] = useLikeDestination(_id);

    const onLikeClickHandler = () => {
        if (isLoading) return;
        sendLike();

    };

    const onDislikeClickHandler = () => {
        if (isLoading) return;
    };

    return (
        <HeartLike
            onClickHandler={isLikedByUser ? onLikeClickHandler : onLikeClickHandler}
            size={size || 46}
            weight={isLikedByUser ? 'fill' : 'thin'}
        />
    );
};

const HeartLike = ({ size, onClickHandler, weight }) => {
    return (
        <Heart 
            size={size} 
            weight={weight} 
            onClick={onClickHandler} 
            className={styles.icon} 
        />
    );
};
