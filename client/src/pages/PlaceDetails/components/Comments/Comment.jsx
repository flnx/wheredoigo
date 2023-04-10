import styles from './Comments.module.css';

export const Comment = ({ comment }) => {
    return (
        <section className={styles.comment}>
            <div className={styles.avatar}>
                {/* <img
                    src={review.userImg}
                    alt="img"
                /> */}
                <span className={styles.username}>{comment.ownerId.username}</span>
            </div>

            <div className={styles.content}>
                <span className={styles.rating}>* * * * *</span>
                <h3 className={styles.commentTitle}>
                    {comment.title}
                </h3>
                <p className={styles.commentContent}>
                   {comment.content}
                </p>
            </div>
        </section>
    );
};
