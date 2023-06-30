exports.errorMessages = {
    auth: 'Invalid Email Address or Password',
    password: 'Password must be at least 8 characters long containing at least 1 number and 1 letter',
    allFieldsRequired: 'All fields are required!',
    username: 'Username must be between 2-12 characters long and contain only latin letters and numbers',
    invalidEmail: 'Invalid Email Address',
    accessDenied: 'Whoopsie. Something went wrong... 🦖',
    notFound: 'Not Found',
    notAddedYet: 'No destinations have been added yet 🦖',
    commentTitle: 'Title must be at least 2 characters long',
    invalidComment: 'Comment must contain at least 10 characters',
    description: 'Description must be between 50 and 5000 characters',
    missingFields: 'Please fill in all required fields',
    unauthorized: 'Unauthorized',
    invalidBody: 'Please send a valid object with the updated destination fields',
    invalidImages: 'In order to upload images, please send an array with valid image files.',
    imagesBoundary: 'You need to upload at least 4 images',
    uploadError: 'Sorry, there was an error during the upload process. Please try again later.',
    cloudinaryValidation: 'Arg1 & Arg2 must be arrays',
    imagesLimitError: 'You have uploaded too many images. Please limit your upload to 20 images or less.',
    selectCategory: 'Please select at least 1 category',
    invalidCategory: 'Invalid category!',
    invalidRating: 'Invalid rating value',
    couldNotUpdate: (fieldName) => `Couldn't update ${fieldName}`,
    couldNotDelete: (name) => `Couldn't delete ${name}`,
    serverError: 'Apologies for the inconvenience. An error occurred. Please try again later. Thank you for your understanding.',
    couldNotAddComment: 'Could not add the comment. Please try again later...',
    placeName: 'Place name must be between 1 and 60 characters',
    destinationDetails: 'Destination details must be an array',
    cityRequired: 'City is required',
    invalidCity: 'We could not find this city in our database :(',
    invalidCountry: 'Invalid country',
    countryRequired: 'Country is required',
    unavailable: 'Service currently unavailable. Please try again later.',
    mustBeAString: (field) => `${field} must be a string`,
    permissions: "Sorry, but you don't have the necessary permissions to make changes to that field. Please reach out to the appropriate administrator or supervisor for assistance."
};
