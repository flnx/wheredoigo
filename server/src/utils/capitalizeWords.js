function capitalizeEachWord(name) {
    if (!name || typeof name != 'string') {
        throw new Error('Invalid username data')
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
