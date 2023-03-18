function validateKeys(arr) {
    console.log(arr);

    // Check each object in the array
    for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];
        // Ensure that the object contains only the expected keys
        const validKeys = [ 'goodToKnow', 'transport', 'localCustoms', 'proTips' ];

        const keys = Object.keys(obj);
        for (let j = 0; j < keys.length; j++) {
            if (!validKeys.includes(keys[j])) {
                return false;
            }
        }
    }
    return true;
}

module.exports = validateKeys;
