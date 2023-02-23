import { Review } from './Review';
import styles from './Reviews.module.css';

export const Reviews = ({ reviews }) => {
    console.log(reviews);

    return (
        <section className={styles.reviewSection}>
            <header className={styles.intro}>
                <h2 className={styles.introTitle}>Reviews</h2>
                <p className={styles.totalReviews}>(315)</p>
            </header>

            <div className={styles.reviews}>
                {reviews.map(x => <Review review={x} key={x.objectId}/>)}
            </div>
        </section>
    );
};
