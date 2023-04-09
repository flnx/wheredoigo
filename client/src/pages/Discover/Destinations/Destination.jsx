import { Link } from 'react-router-dom';
import capitalizeEachWord from '../../../utils/capitalizeEachWord';

import styles from './Destination.module.css';

export const Destination = ({ destination }) => {
    return (
        <Link to={`/destinations/${destination._id}`}>
            <div className={styles.destination}>
                <img
                    src={destination.imageUrls}
                    alt={destination.city}
                    className={styles.image}
                />
                <h3 className={styles.title}>{capitalizeEachWord(destination.city)}</h3>
                <p>{capitalizeEachWord(destination.country.name)}</p>
            </div>
        </Link>
    );
};
