import { Star } from 'phosphor-react';
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
                <h2 className={styles.place}>{destination.city}</h2>
                <div className={styles.rating}>
                    <Star />
                    <span>{destination.rating}</span>
                </div>

                <p className={styles.country}>{destination.country}</p>
                <p>${destination.price}</p>
            </section>
        </div>
    );
};
