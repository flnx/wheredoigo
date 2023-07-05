const extractCloudinaryFolderName = require('./extractFolderName');

function extractMultipleFolderNames(destinationCity, destinationId, places) {
    const mainFolder = 'destinations';
    const subFolder = 'places';

    // Extract destination folder name
    const destFolderName = extractCloudinaryFolderName(
        mainFolder,
        destinationCity,
        destinationId
    );

    // Extract places sub folder names
    const placesFolderNames = places.map((place) => {
        let { city, _id } = place;
        _id = _id.toString();

        const placeFolderName = extractCloudinaryFolderName(subFolder, city, _id);
        return placeFolderName;
    });

    return [destFolderName, ...placesFolderNames];
}

module.exports = extractMultipleFolderNames;
