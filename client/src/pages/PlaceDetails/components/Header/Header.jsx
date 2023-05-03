import { StarRating } from '../../../../components/StarRating/StarRating';

import styles from './Header.module.css';

export const Header = ({ place }) => {
    const { name, city, description } = place;

    return (
        <header>
            <section className={styles.intro}>
                <h1>{name}</h1>
                <p>{city}</p>
            </section>
            <div className={styles.flexContainer}>
                <section className={styles.flexChild}>
                    <h3 className={styles.title}>About</h3>
                    <p>{description}</p>
                </section>
                <section className={styles.flexChild}>
                    <h3 className={styles.title}>Ratings and Reviews</h3>
                    <StarRating rating={5} />
                </section>
                <section className={styles.flexChild}>
                    <h3 className={styles.title}>In Progress..</h3>
                    <p>🦖🦖🦖</p>
                </section>
            </div>
        </header>
    );
};
