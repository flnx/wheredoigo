import PropTypes from 'prop-types';

// Components
import { ImageContainer } from './components/ImageContainer';
import { Content } from './components/Content';

import { applyCloudinaryTransformation } from '../../utils/utils';
import routeConstants from '../../constants/routeConstants';
import styles from './Places.module.css';

const propTypes = {
    places: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    isOwner: PropTypes.bool,
    onDeleteClickHandler: PropTypes.func,
};

export const Places = ({ places, isLoading, onDeleteClickHandler, isOwner }) => {
    const { BY_ID } = routeConstants.PLACES;

    return (
        <div className={styles['places']}>
            {places.map((place) => (
                <div className={styles.card} key={place._id}>
                    <ImageContainer
                        isLoading={isLoading}
                        link={BY_ID.routePath(place._id)}
                        imageUrl={applyCloudinaryTransformation(place.imageUrl)}
                        alt={place.name}
                    />

                    <Content
                        place={place}
                        isLoading={isLoading}
                        onDeleteClickHandler={onDeleteClickHandler}
                        isOwner={isOwner}
                    />
                </div>
            ))}
        </div>
    );
};

Places.propTypes = propTypes;
