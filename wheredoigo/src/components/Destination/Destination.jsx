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
                <div className={styles.flex}>
                    <h2>{destination.city}</h2>

                    <div className={styles.rating}>
                        <Star size={24} />
                        <span>{destination.rating}</span>
                    </div>
                </div>

                <div className={`${styles.flex}`}>
                    <p>{destination.country}</p>
                    <p>${destination.price}</p>
                </div>
            </section>
        </div>
    );
};
