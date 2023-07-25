const errorMessages = Object.freeze({
    auth: {
        invalidCredentials: 'Invalid email address or password',
        accessDenied: 'Sorry, you do not have permission to access this resource',
        unauthorized: 'Unauthorized',
    },

    validation: {
        fieldsReq: 'Please fill in all required fields',
        email: 'Please enter a valid email address.',
        shortPassword: 'Password must be at least 8 characters long',
        password: 'Password must include at least one letter and one digit.',
        username: 'Username must be between 2-12 characters long and contain only letters and numbers',
        comment: {
            title: 'Title must be between 2 and 100 characters',
            body: 'Comment must be between 10 and 2000 characters',
            addFailed: 'Failed to add the comment. Please try again later',
            rating: 'Please rate the place to share your experience',
        },
        description: (min = 50, max = 5000) => `Description must be between ${min} and ${max} characters`,
        placeName: 'Place name must be between 1 and 60 characters',
    },

    data: {
        notFound: 'Not Found 🦖',
        notEdited: "Oops! Edit failed. We couldn't find the thing you were trying to update.",
        notDeleted: 'Deletion process failed. Please try again.',
        imagesBoundary: (num = 1) => `Please upload a minimum of ${num} ${num > 1 ? 'images' : 'image'}.`,
        imagesLimit: 'You have uploaded too many images. Please limit your upload to 50 images or less',
        category: 'Please select at least 1 valid category',
        type: 'Please select a type',
        repeatingValues: (field) => `Repeating values found in - ${field}`,
        city: 'We could not find this city in our database :(',
        country: 'We could not find this country in our database :(',
        details: 'Missing details or repeating/unacceptable details names',
        required: (field) => `${field} is required`
    },

    request: {
        server: 'Apologies for the inconvenience. An error occurred. Please try again later',
        body: 'Request Body must be an Object',
        upload: 'Sorry, there was an error during the upload process. Please try again.',
        unavailable: 'Service currently unavailable. Please try again later.',
    },
});

export default errorMessages;