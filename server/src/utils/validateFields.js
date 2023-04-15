const { errorMessages } = require("../constants/errorMessages");
const { createValidationError } = require("./createValidationError");

function validateFields(placeData) {
    const isFieldEmpty = Object.values(placeData).some((x) => !x);

    if (isFieldEmpty) {
        throw createValidationError(errorMessages.missingFields, 400);
    }
}

module.exports = {
    validateFields
}