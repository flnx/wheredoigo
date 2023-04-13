import { Link } from 'react-router-dom';
import capitalizeEachWord from '../../../utils/capitalizeEachWord';

import styles from './Destination.module.css';

export const Destination = ({ destination }) => {
    const { imageUrls, _id, city, country } = destination;

    return (
        <Link to={`/destinations/${_id}`}>
            <div className={styles.destination}>
                <img
                    src={imageUrls.imageUrl}
                    alt={city}
                    className={styles.image}
                />
                <h3 className={styles.title}>
                    {capitalizeEachWord(city)}
                </h3>
                <p>{capitalizeEachWord(country.name)}</p>
            </div>
        </Link>
    );
};
