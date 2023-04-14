function validateFields(placeData) {
    const isFieldEmpty = Object.values(placeData).some((x) => !x);

    if (isFieldEmpty) {
        const error = new Error('Missing Fields');
        error.status = 406;
        throw error;
    }
}

module.exports = {
    validateFields
}