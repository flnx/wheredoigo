function capitalizeEachWord(name) {
    if (!name || typeof name != 'String') {
        throw new Error('Valid name is required!');
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
