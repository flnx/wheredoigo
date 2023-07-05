function fixInvalidFolderNameChars(city, id) {
    return `${city}-${id}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

module.exports = fixInvalidFolderNameChars;