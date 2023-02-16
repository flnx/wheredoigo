import styles from './CommentForm.module.css';

export const CommentForm = () => {
    return (
        <div>
            <h3 className={styles.title}>Leave a review</h3>
            <form className={styles.form}>
                <textarea className={styles.textarea} />
                <button type='submit' className={styles.btn}>Submit your review</button>
            </form>
        </div>
    );
};
