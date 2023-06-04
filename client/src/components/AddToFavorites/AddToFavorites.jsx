import PropTypes from 'prop-types';
import { useLikeDestination } from '../../hooks/queries/useLikeDestinations';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component
import { Heart } from '@phosphor-icons/react';
import { ServerError } from '../ServerError/ServerError';

import styles from './AddToFavorites.module.css';
import routeConstants from '../../constants/routeConstants';

const propTypes = {
    size: PropTypes.number,
    _id: PropTypes.string.isRequired,
    isLikedByUser: PropTypes.bool.isRequired,
    hasSession: PropTypes.bool.isRequired,
};

export const AddToFavorites = ({ size, _id, isLikedByUser, hasSession }) => {
    const [sendLike, isLoading, error] = useLikeDestination(_id);
    const [rotateClass, setRotateClass] = useState('');
    const navigate = useNavigate();
    const { routePath } = routeConstants.AUTH.LOGIN;

    const onLikeClickHandler = () => {
        if (!hasSession) navigate(routePath);
        if (isLoading || !_id) return;
        setRotateClass(styles.rotate);
        sendLike({ path: 'like', isLike: true });
    };

    const onDislikeClickHandler = () => {
        if (isLoading || !_id) return;
        setRotateClass('');
        sendLike({ path: 'dislike', isLike: false });
    };

    const clickHandler = isLikedByUser ? onDislikeClickHandler : onLikeClickHandler;
    const likedOrDislikedClass = isLikedByUser ? 'hasLike' : 'hasNoLike';

    return (
        <>
            <Heart
                size={size || 46}
                weight={isLikedByUser ? 'fill' : 'thin'}
                onClick={clickHandler}
                className={`${styles.icon} ${rotateClass} ${likedOrDislikedClass}`}
                data-testid="heart-icon"
            />
            {error && <ServerError errorMessage={error} />}
        </>
    );
};

AddToFavorites.proptypes = propTypes;
