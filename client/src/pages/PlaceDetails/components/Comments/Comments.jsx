import { Comment } from './Comment';
import styles from './Comments.module.css';

export const Comments = ({ comments }) => {
    return (
        <section className={styles.commentSection}>
            <header className={styles.intro}>
                <h2 className={styles.introTitle}>Reviews</h2>
                <p className={styles.totalComments}>(315)</p>
            </header>

            <div className={styles.comments}>
                {comments.data.map((c) => (
                    <Comment comment={c} key={c._id} />
                ))}
            </div>
        </section>
    );
};
