export function getPageFromSearchParams(currentPage) {
    const page = parseInt(currentPage.get('page'));

    if (!Number.isInteger(page) || page < 1) {
        return 1;
    }

    return page;
}
