import { StarRating } from '../StarRating/StarRating';
import styles from './Destination.module.css';

export const Destination = ({ destination }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src={destination.imageUrl}
                    alt="A beautiful old building painted in yellow"
                    className={styles.image}
                />
            </div>
            <section className={styles.content}>
                <div className={styles.flex}>
                    <h3>{destination.city}</h3>
                </div>

                <div className={`${styles.flex}`}>
                    <p className={styles.destination}>{destination.country}</p>
                    <p className={styles.price}>${destination.price}</p>
                </div>
            </section>
        </div>
    );
};
