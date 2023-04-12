const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).array('imageUrls', 20);
const uploadAvatar = multer({ storage: storage }).single('avatarUrl');

module.exports = {
    upload,
    uploadAvatar
}
