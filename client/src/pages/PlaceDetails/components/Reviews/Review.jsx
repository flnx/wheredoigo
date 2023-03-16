import styles from './Reviews.module.css';

export const Review = ({ review }) => {
    return (
        <section className={styles.review}>
            <div className={styles.avatar}>
                <img
                    src={review.userImg}
                    alt="img"
                />
                <span className={styles.username}>{review.username}</span>
            </div>

            <div className={styles.content}>
                <span className={styles.rating}>* * * * *</span>
                <h3 className={styles.reviewTitle}>
                    {review.title}
                </h3>
                <p className={styles.reviewComment}>
                   {review.content}
                </p>
            </div>
        </section>
    );
};
