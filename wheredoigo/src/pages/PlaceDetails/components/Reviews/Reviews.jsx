import styles from './Reviews.module.css';

export const Reviews = () => {
    return (
        <section className={styles.reviewSection}>
            <header className={styles.intro}>
                <h2 className={styles.introTitle}>Reviews</h2>
                <p className={styles.totalReviews}>(315)</p>
            </header>

            <div className={styles.reviews}>
                <section className={styles.review}>
                    <div className={styles.avatar}>
                        <img
                            src="https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/eb/43/default-avatar-2020-11.jpg"
                            alt="img"
                        />
                        <span className={styles.username}>Username</span>
                    </div>

                    <div className={styles.content}>
                        <span className={styles.rating}>* * * * *</span>
                        <h3 className={styles.reviewTitle}>Excellent!</h3>
                        <p className={styles.reviewComment}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatibus accusantium inventore distinctio
                            laboriosam rerum eveniet provident, facilis totam
                            quis.
                        </p>
                    </div>
                </section>
                <section className={styles.review}>
                    <div className={styles.avatar}>
                        <img
                            src="https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/eb/43/default-avatar-2020-11.jpg"
                            alt="img"
                        />
                        <span className={styles.username}>Username</span>
                    </div>

                    <div className={styles.content}>
                        <span className={styles.rating}>* * * * *</span>
                        <h3 className={styles.reviewTitle}>Excellent!</h3>
                        <p className={styles.reviewComment}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatibus accusantium inventore distinctio
                            laboriosam rerum eveniet provident, facilis totam
                            quis.
                        </p>
                    </div>
                </section>
            </div>
        </section>
    );
};
