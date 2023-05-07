import { useState } from 'react';
import { PaginationBar } from '../PaginationBar/PaginationBar';
import { Comment } from './Comment';
import styles from './Comments.module.css';

export const Comments = ({ comments }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const { hasNextPage, hasPreviousPage, totalPages } = comments;

    const onPageClickHandler = (page) => {
        setCurrentPage(page);
    }

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
            <PaginationBar
                currentPage={98}
                totalPages={100}
                onPageClickHandler={onPageClickHandler}
                hasNextPage={true}
                hasPreviousPage={true}
            />
        </section>
    );
};
