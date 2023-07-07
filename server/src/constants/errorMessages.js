exports.errorMessages = {
    auth: {
        invalidCredentials: 'Invalid email address or password',
        accessDenied: 'Sorry, you do not have permission to access this resource',
        unauthorized: 'Unauthorized',
    },

    validation: {
        fieldsReq: 'Please fill in all required fields',
        email: 'Invalid email address',
        password: 'Password must be at least 8 characters long and include at least 1 number and 1 letter',
        username: 'Username must be between 2-12 characters long and contain only letters and numbers',
        comment: {
            title: 'Title must be at least 2 characters long',
            body: 'Comment must contain at least 10 characters',
            addFailed: 'Failed to add the comment. Please try again later',
        },
        description: 'Description must be between 50 and 5000 characters',
        placeName: 'Place name must be between 1 and 60 characters',
    },

    accessDenied: 'Sorry, you do not have permission to access this resource... 🦖',
    notFound: 'Not Found',
    invalidComment: 'Comment must contain at least 10 characters',
    couldNotAddComment: 'Failed to add the comment. Please try again later...',
    missingFields: 'Please fill in all required fields',
    unauthorized: 'Unauthorized',
    invalidBody: 'Please send a valid object with the updated destination fields',
    invalidImages:
        'In order to upload images, please send an array with valid image files.',
    imagesBoundary: (num) =>
        `You need to upload at least ${num} ${num > 1 ? 'images' : 'image'}`,
    uploadError:
        'Sorry, there was an error during the upload process. Please try again later.',
    imagesLimitError:
        'You have uploaded too many images. Please limit your upload to 20 images or less.',
    selectCategory: 'Please select at least 1 category',
    invalidCategory: 'Invalid category!',
    invalidRating: 'Please rate the place to share your experience.',
    couldNotUpdate: (fieldName) => `Couldn't update ${fieldName}`,
    couldNotDelete: (name) => `Couldn't delete ${name}`,
    serverError:
        'Apologies for the inconvenience. An error occurred. Please try again later. Thank you for your understanding.',
    destinationDetails: 'Destination details must be an array',
    cityRequired: 'City is required',
    invalidCity: 'We could not find this city in our database :(',
    invalidCountry: 'Invalid country',
    countryRequired: 'Country is required',
    unavailable: 'Service currently unavailable. Please try again later.',
    mustBeAString: (field) => `${field} must be a string`,
    session: (msg = '') => `Error ending session: ${msg}`,
    permissions:
        "Sorry, but you don't have the necessary permissions to make changes to that field. Please reach out to the appropriate administrator or supervisor for assistance.",
};
