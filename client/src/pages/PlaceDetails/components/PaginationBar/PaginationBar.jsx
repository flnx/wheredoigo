import { useEffect, useState } from 'react';

import styles from './PaginationBar.module.css';

export function PaginationBar({
    currentPage,
    totalPages,
    onPageClickHandler,
    hasNextPage,
    hasPreviousPage,
    isPreviousData,
    isFetching,
}) {
    const [displayedPages, setDisplayedPages] = useState([]);

    useEffect(() => {
        const pages = [];
        const displayCount = 5; // max range of pages to display in the bar
        let startPage = Math.max(1, currentPage - Math.floor(displayCount / 2));
        let endPage = Math.min(totalPages, startPage + displayCount - 1);

        if (endPage - startPage < displayCount - 1) {
            startPage = Math.max(1, endPage - displayCount + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        setDisplayedPages(pages);
    }, [currentPage, totalPages]);

    return (
        <div className={styles['pagination-bar']}>
            <button
                onClick={() => onPageClickHandler(currentPage - 1)}
                disabled={isPreviousData || !hasPreviousPage}
            >
                {'Prev'}
            </button>
            {displayedPages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageClickHandler(page)}
                    className={page === currentPage ? styles.active : ''}
                    disabled={isFetching}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageClickHandler(currentPage + 1)}
                disabled={isPreviousData || !hasNextPage}
            >
                {'Next'}
            </button>
        </div>
    );
}
