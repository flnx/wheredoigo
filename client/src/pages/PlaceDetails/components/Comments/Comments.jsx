import { PaginationBar } from '../PaginationBar/PaginationBar';
import { Comment } from './Comment';
import { useSearchParams } from 'react-router-dom';
import { getPageFromSearchParams } from '../../../../utils/getPageFromSearchParams';
import { usePlaceComments } from '../../../../hooks/queries/usePlaceComments';
import styles from './Comments.module.css';

export const Comments = ({ placeId }) => {
    const [currentPage, setCurrentPage] = useSearchParams({});
    const page = getPageFromSearchParams(currentPage);
    const [comments, error, isLoading, isPreviousData, isFetching] = usePlaceComments({ placeId, page });

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

    if (isLoading || error) {
        return 'Loading || Error';
    }

    const { data, hasNextPage, hasPreviousPage, totalPages } = comments;

    return (
        <section className={styles.commentSection}>
            <header className={styles.intro}>
                <h3>Comments</h3>
                <span className={styles.totalCommentsNum}>{comments?.totalComments}</span>
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
    );
};
