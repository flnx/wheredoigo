import { Link } from 'react-router-dom';
import { LoadingSkeleton } from '../../LoadingSkeletons/LoadingSkeleton';
import routeConstants from '../../../constants/routeConstants';
const { BY_ID } = routeConstants.DESTINATIONS;

import styles from './CitiesSlider.module.css';

export const SliderCard = ({ destination = {}, isLoading = true }) => {
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
            <div className={styles.content}>
                <h3>{isLoading ? <LoadingSkeleton /> : city}</h3>
                <p>{isLoading ? <LoadingSkeleton /> : country?.name}</p>
            </div>
        </Card>
    );
};

const Card = ({ children, _id, isLoading }) => {
    return (
        !isLoading && _id 
            ? <Link to={BY_ID.routePath(_id)}>{children}</Link> 
            : children
        );
};

