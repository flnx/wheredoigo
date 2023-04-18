import { Link } from 'react-router-dom';
import styles from './Destination.module.css';

export const Destination = ({ destination }) => {
    const { _id, city, country, imageUrls } = destination;

    return (
        <Link to={`/destinations/${_id}`}>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <img src={imageUrls} alt={city} className={styles.image} />
                </div>
                <section className={styles.content}>
                    <div className={styles.flex}>
                        <h3>{city}</h3>
                    </div>

                    <div className={`${styles.flex}`}>
                        <p className={styles.destination}>{country}</p>
                    </div>
                </section>
            </div>
        </Link>
    );
};
