import PropTypes from 'prop-types';

// Components
import { Link } from 'react-router-dom';
import { LoadingSkeleton } from '../../LoadingSkeletons/LoadingSkeleton';

import routeConstants from '../../../constants/routeConstants';
import styles from './CitiesSlider.module.css';

export const SliderCard = ({ destination, isLoading }) => {
    const { imageUrls, city, country, _id } = destination;

    return (
        <Card _id={_id} isLoading={isLoading}>
            <div className={styles.imageContainer}>
                {isLoading
                    ? <LoadingSkeleton />
                    : <img 
                        src={imageUrls?.imageUrl} 
                        alt={city} 
                        className={styles.image} 
                    />
                }
            </div>
            {isLoading 
                ?  <div className={styles.loading}>
                        <h3><LoadingSkeleton /></h3>
                        <p><LoadingSkeleton /></p>
                   </div> 
                :  <div className={styles.content}>
                        <h3>{city}</h3>
                        <p>{country?.name}</p>
                    </div>}
        </Card>
    );
};

const Card = ({ children, _id, isLoading }) => {
    const { BY_ID } = routeConstants.DESTINATIONS;
    
    return (
        !isLoading && _id 
            ? <Link to={BY_ID.routePath(_id)}>{children}</Link> 
            : children
        );
};

SliderCard.propTypes = {
    destination: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

