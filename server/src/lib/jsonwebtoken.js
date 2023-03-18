const util = require('util');

const jwtCallback = require('jsonwebtoken');

const sign = util.promisify(jwtCallback.sign);
const verify = util.promisify(jwtCallback.verify);

module.exports = {
    sign,
    verify,
};
