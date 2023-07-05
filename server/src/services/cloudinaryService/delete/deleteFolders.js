const { cloudinary } = require('../../../config/cloudinary');
const { isValidArrayOfStrings } = require('../../../utils/utils');

async function deleteFolders(folderNames) {
    if (!isValidArrayOfStrings(folderNames)) {
        return;
    }

    folderNames.forEach((folder) => {
        cloudinary.api.delete_folder(folder).catch((error) => {
            console.error(error.message || error);
        });
    });
}

module.exports = deleteFolders;
