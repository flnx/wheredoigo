import { StarRating } from '../../../../components/StarRating/StarRating';
import styles from './Header.module.css';

export const DestinationHeader = ({ destination }) => {
    return (
        <header className={styles.intro}>
            <img src={destination.imageUrl.url} alt={destination.city} />
            <div className={styles.titleWrapper}>
                <h1>{destination.city}</h1>
                <StarRating rating={5} />
            </div>
            <p className={styles.countryName}>{destination.country}</p>
            <h3 className={styles.descriptionTitle}>Overview</h3>
            <p className={styles.description}>{destination.description}</p>
        </header>
    );
};
