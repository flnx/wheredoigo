import { Link } from 'react-router-dom';
import styles from './Destination.module.css';

export const Destination = ({ destination }) => {
    return (
        <Link to={"/destinations/" + destination.objectId}>
            <div className={styles.destination}>
                <img
                    src={destination.imageUrl.url}
                    alt="travel place"
                    className={styles.image}
                />
                <h3 className={styles.title}>{destination.city}</h3>
                <p>{destination.country}</p>
            </div>
        </Link>
    );
};
