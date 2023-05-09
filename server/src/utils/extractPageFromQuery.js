function extractPageFromQuery(currentPage) {
    const page = parseInt(currentPage);

    if (!Number.isInteger(page) || page < 1) {
        return 1;
    }

    return page;
}

module.exports = {
    extractPageFromQuery
}