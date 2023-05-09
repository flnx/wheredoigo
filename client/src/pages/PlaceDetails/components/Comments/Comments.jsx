import { useEffect, useState } from 'react';
import { PaginationBar } from '../PaginationBar/PaginationBar';
import { Comment } from './Comment';
import { useSearchParams } from 'react-router-dom';
import { getPageFromSearchParams } from '../../../../utils/getPageFromSearchParams';
import styles from './Comments.module.css';

export const Comments = ({ comments }) => {
    const { hasNextPage, hasPreviousPage, totalPages } = comments;
    const [currentPage, setCurrentPage] = useSearchParams({});
    const page = getPageFromSearchParams(currentPage);
    const { data, error, isLoading } = useInfiniteDestinations(page); 

    const onPageClickHandler = (value) => {
        const page = parseInt(value);

        if (!Number.isInteger(page) || page < 1) {
            // if page is not a valid integer or less than 1, set default page to 1
            setCurrentPage({});
        } else {
            // update current page with the new page value
            setCurrentPage({ page });
        }
    };

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
