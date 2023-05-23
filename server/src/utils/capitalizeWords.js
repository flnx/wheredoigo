function capitalizeEachWord(name) {
    if (!name || typeof name != 'string') {
        throw new Error('Only string values are accepted');
    }

    const result = name
        .split(/[\s-]+/)
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');

    return result;
}

module.exports = capitalizeEachWord;
