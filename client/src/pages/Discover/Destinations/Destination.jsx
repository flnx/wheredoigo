import { Link } from 'react-router-dom';
import styles from './Destination.module.css';

export const Destination = ({ destination }) => {
    return (
        <Link to={`/destinations/${destination._id}`}>
            <div className={styles.destination}>
                <img
                    src={destination.imageUrls[0]}
                    alt={destination.city}
                    className={styles.image}
                />
                <h3 className={styles.title}>{destination.city}</h3>
                <p>ADD COUNTRY NAME NOT ID</p>
            </div>
        </Link>
    );
};
