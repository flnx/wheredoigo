import { Link } from 'react-router-dom';
import { LoadingSkeleton } from '../../LoadingSkeletons/LoadingSkeleton';

import routeConstants from '../../../constants/routeConstants';
import styles from './CitiesSlider.module.css';

const { BY_ID } = routeConstants.DESTINATIONS;

export const SliderCard = ({ destination = {}, isLoading }) => {
    const { imageUrls, city, country, _id } = destination;

    return (
        <Link to={BY_ID.routePath(_id)}>
            <div className={styles.imageContainer}>
                {isLoading 
                    ? <LoadingSkeleton />
                    : <img src={imageUrls.imageUrl} alt={city} className={styles.image} />
                }
            </div>
            <div className={styles.content}>
                <h3>
                    {isLoading ? <LoadingSkeleton /> : city}
                </h3>
                <p>
                    {isLoading ? <LoadingSkeleton /> : country.name}
                </p>
            </div>
        </Link>
    );
};
