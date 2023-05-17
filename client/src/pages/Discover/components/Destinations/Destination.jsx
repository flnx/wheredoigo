import { Link } from 'react-router-dom';

import routeConstants from '../../../../constants/routeConstants';
import styles from './Destination.module.css';

const { BY_ID } = routeConstants.DESTINATIONS;

export const Destination = ({ destination }) => {
    const { imageUrls, _id, city, country } = destination;

    return (
        <Link to={BY_ID.routePath(_id)}>
            <div className={styles.destination}>
                <img src={imageUrls.imageUrl} alt={city} className={styles.image} />
                <h3 className={styles.title}>{city}</h3>
                <p>{country.name}</p>
            </div>
        </Link>
    );
};
