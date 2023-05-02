import { Link } from 'react-router-dom';

import routeConstants from '../../../constants/routeConstants';
import styles from './CitiesSlider.module.css';

const { BY_ID } = routeConstants.DESTINATIONS;

export const SliderCard = ({ destination }) => {
    const { imageUrls, city, country, _id } = destination;

    return (
        <Link to={BY_ID.routePath(_id)}>
            <img src={imageUrls.imageUrl} alt={city} className={styles.image} />
            <div className={styles.content}>
                <h3>{city}</h3>
                <p>{country.name}</p>
            </div>
        </Link>
    );
};
