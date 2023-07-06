const { cloudinary } = require('../../../config/cloudinary');
const { isValidArrayOfStrings } = require('../../../utils/utils');

async function deleteFolders(folderNames) {
    console.log(folderNames);
    if (!isValidArrayOfStrings(folderNames)) return;

    folderNames.forEach((folder) => {
        cloudinary.api
            .delete_folder(folder)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error(error);
            });
    });
}

module.exports = deleteFolders;
