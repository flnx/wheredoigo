function capitalizeEachWord(name) {
    if (!name || typeof name != 'string') {
        throw new Error('The input must be a string');
    }

    const result = name
        .split(/[\s-]+/)
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');

    return result;
}

export default capitalizeEachWord;
