import PropTypes from 'prop-types';

// Components
import { Link } from 'react-router-dom';
import { LoadingSkeleton } from '../../LoadingSkeletons/LoadingSkeleton';

import routeConstants from '../../../constants/routeConstants';
import styles from './CitiesSlider.module.css';

const propTypes = {
    destination: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export const SliderCard = ({ destination, isLoading }) => {
    const { imageUrls, city, country, _id } = destination;
    const { routePath } = routeConstants.DESTINATIONS.BY_ID;

    const loadingClass = `${isLoading ? styles.pointersDisabled : null}`;

    return (
        <Link to={routePath(_id)} className={loadingClass}>
            <div className={styles.imageContainer}>
                {isLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <img src={imageUrls?.imageUrl} alt={city} className={styles.image} />
                )}
            </div>
            {isLoading ? (
                <div className={styles.loading}>
                    <h3><LoadingSkeleton /></h3>
                    <p><LoadingSkeleton /></p>
                </div>
            ) : (
                <div className={styles.content}>
                    <h3>{city}</h3>
                    <p>{country?.name}</p>
                </div>
            )}
        </Link>
    );
};

SliderCard.propTypes = propTypes;
