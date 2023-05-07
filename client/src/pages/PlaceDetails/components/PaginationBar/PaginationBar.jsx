import { useEffect, useState } from 'react';

export function PaginationBar({
    currentPage,
    totalPages,
    onPageClickHandler,
    hasNextPage,
    hasPreviousPage,
}) {
    const [displayedPages, setDisplayedPages] = useState([]);

    useEffect(() => {
        const pages = [];
        const displayCount = 5; // number of pages to display in the bar
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
        <div className="pagination-bar">
            {hasPreviousPage && (
                <button onClick={() => onPageClickHandler(currentPage - 1)}>{'<'}</button>
            )}
            {displayedPages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageClickHandler(page)}
                    className={page === currentPage ? 'active' : ''}
                >
                    {page}
                </button>
            ))}
            {hasNextPage && (
                <button onClick={() => onPageClickHandler(currentPage + 1)}>{'>'}</button>
            )}
        </div>
    );
}
