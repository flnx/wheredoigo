import { ClipLoader } from 'react-spinners';
import { useSearchParams } from 'react-router-dom';

// Utils
import { getPageFromSearchParams } from 'src/utils/getPageFromSearchParams';
import { extractServerErrorMessage } from 'src/utils/utils';

// Custom Hooks
import { usePlaceComments } from 'src/hooks/queries/usePlaceComments';

// Local Components
import { PaginationBar } from '../PaginationBar/PaginationBar';
import { Comment } from './Comment';

import styles from './Comments.module.css';

export const Comments = ({ placeId, commentSectionRef }) => {
    const [currentPage, setCurrentPage] = useSearchParams({});
    const page = getPageFromSearchParams(currentPage);
    const [comments, error, isPreviousData, isFetching] = usePlaceComments({ placeId, page });

    const onPageClickHandler = (value) => {
        const page = parseInt(value);

        if (!Number.isInteger(page) || page < 1) {
            // if page is not a valid integer or less than 1, set default page to 1
            setCurrentPage({});
        } else {
            // update current page with the new page value
            setCurrentPage({ page });
        }
        commentSectionRef.current?.scrollIntoView();
    };

    const { data, hasNextPage, hasPreviousPage, totalPages } = comments;
    const hasComments = data && data?.length > 0;
    const hasNoComments = !error && !hasComments;

    return (
        <>
            {error && <p>{extractServerErrorMessage(error)}</p>}
            {hasComments && (
                <section
                    className={`${styles.commentSection} ${isFetching && styles.opacity}`}
                    ref={commentSectionRef}
                >
                    <header className={styles.intro}>
                        <h3>Comments</h3>
                        <span className={styles.totalCommentsNum}>
                            {comments?.totalComments}
                        </span>
                    </header>

                    <div className={styles.comments}>
                        {data.map((c) => (
                            <Comment comment={c} key={c._id} />
                        ))}
                    </div>
                    <PaginationBar
                        currentPage={page}
                        totalPages={totalPages}
                        onPageClickHandler={onPageClickHandler}
                        hasNextPage={hasNextPage}
                        hasPreviousPage={hasPreviousPage}
                        isPreviousData={isPreviousData}
                        isFetching={isFetching}
                    />
                </section>
            )}
            {hasNoComments && <p>No comments have been added yet</p>}
            <ClipLoader
                color="#36d7b7"
                size={40}
                loading={isFetching}
                aria-label="Loading Spinner"
                className={styles.loader}
            />
        </>
    );
};
