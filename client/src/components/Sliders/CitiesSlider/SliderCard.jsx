import { Link } from 'react-router-dom';
import styles from './CitiesSlider.module.css';

export const SliderCard = ({ destination }) => {
    return (
        <Link to={`/destinations/${destination.objectId}`}>
            <img
                src={destination.imageUrls[0]}
                alt="city"
                className={styles.image}
            />
            <div className={styles.content}>
                <h3>{destination.city}</h3>
                <p>{destination.country.name}</p>
            </div>
        </Link>
    );
};
