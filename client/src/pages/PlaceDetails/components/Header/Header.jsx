import { StarRating } from '../../../../components/StarRating/StarRating';

import styles from './Header.module.css';

export const Header = ({ place }) => {
    return (
        <header>
            <section className={styles.intro}>
                <h1>{place.place}</h1>
                <p>{place.city}</p>
            </section>
            <div className={styles.flexContainer}>
                <section>
                    <h3 className={styles.title}>About</h3>
                    <p>{place.description}</p>
                </section>
                <section>
                    <h3 className={styles.title}>Ratings and Reviews</h3>
                    <StarRating rating={5} />
                </section>
                <section>
                    <h3 className={styles.title}>Overview</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, vero.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, vero.</p>
                </section>
            </div>
        </header>
    );
};
