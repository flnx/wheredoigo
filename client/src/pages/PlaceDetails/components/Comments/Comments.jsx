import { Comment } from './Comment';
import styles from './Comments.module.css';

export const Comments = ({ comments }) => {
    return (
        <section className={styles.reviewSection}>
            <header className={styles.intro}>
                <h2 className={styles.introTitle}>Reviews</h2>
                <p className={styles.totalReviews}>(315)</p>
            </header>

            <div className={styles.reviews}>
                {reviews.map((x) => (
                    <Comment review={x} key={x.objectId} />
                ))}
            </div>
        </section>
    );
};
