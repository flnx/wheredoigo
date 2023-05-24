import { useLikeDestination } from '../../hooks/queries/useLikeDestinations';
import { useState } from 'react';
import { Heart } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

import styles from './AddToFavorites.module.css';
import routeConstants from '../../constants/routeConstants';

export const AddToFavorites = ({ size, _id, isLikedByUser, hasSession }) => {
    const [sendLike, isLoading, error] = useLikeDestination(_id);
    const [rotateClass, setRotateClass] = useState('');
    const navigate = useNavigate();
    const { routePath } = routeConstants.AUTH.LOGIN;

    const onLikeClickHandler = () => {
        if (!hasSession) navigate(routePath);
        if (isLoading) return;
        setRotateClass(styles.rotate);
        sendLike({ path: 'like', isLike: true });
    };

    const onDislikeClickHandler = () => {
        if (isLoading) return;
        setRotateClass('');
        sendLike({ path: 'dislike', isLike: false });
    };

    return (
        <HeartLike
            onClickHandler={isLikedByUser ? onDislikeClickHandler : onLikeClickHandler}
            size={size || 46}
            weight={isLikedByUser ? 'fill' : 'thin'}
            rotateClass={rotateClass}
        />
    );
};

const HeartLike = ({ size, onClickHandler, weight, rotateClass }) => {
    return (
        <Heart
            size={size}
            weight={weight}
            onClick={onClickHandler}
            className={`${styles.icon} ${rotateClass}`}
        />
    );
};
