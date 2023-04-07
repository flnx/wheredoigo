# NodeJS Server for Where Do I Go SPA App

## Server Packages:
- Express
- MongoDB
- dotenv
- cors
- bcrypt
- jsonwebtoken
- validator
- cloudinary
- multer
- streamifier

### REGISTER
* Endpoint: /register
METHOD: POST

- Email: Valid and unique email address
- Password: At least 6 characters long
- Username: At least 2 characters long and must contain only letters and numbers

### LOGIN
* endpoint: /login
<method: POST>

- Valid Email & Password

### DESTINATIONS
* endpoint: /destinations

<method: GET>
- returns max 9 destinations

* in order too get less than 9 results use limit
    - query: limit
    - example: destinations?limit=5
* in order to achieve <PAGINATION>, use page query
    - query: page
    - example: /destinations?page=3
* to combine them: 
    - destinations?page=3&limit=4

<method: POST>
    - endpoint: /destinations 
    - JSON Structure:
    {
        "country": "test",
        "city": "test",
        "description": "test",
        "details": [
            {
                "category": "test",
                "title": "test",
                "description": "test!",
            }
        ],
        "imageUrls": [
            "https://test.com",
            "https://test2.com"
        ],
    }
 
 - If the country does not exist the server will create it and append its id to the destination
 - Countries and cities must contain only letters, single spaces or single dashes "-"
 - all fields are required except "details"
    - "Details" fields must be objects which have the following props: "category", "title", "description"
    - You can have multiple objects in details
- "imageUrls" is an array of strings. The strings must be valid urls.
- "Categories" are limited to: "goodToKnow", "transport", "localCustoms", "proTips", (might be updated)

### PLACES
<method: GET>
- endpoint: /places

### FETCH CITY DATA
<method: POST>

- endpoint: /destinations/get-city-data
- JSON Structure: {
    city: "cityName"
}

### A cloud-based image management service - Cloudinary and Image Handling
#### Info:
- Acepts an array of files as input and returns an array of image URLs which represents the URLs of the uploaded images in Cloudinary.

1. The "Destination/Places" controller looks for "imageUrls" in req.files to check if there's images. 

2. The server passes the destination or place data along with the image files.

3. The model controllers pass the images files to another function that handles the images: <handleImageUploads>
    - The function iterates through the array of files using a for loop and calls the <uploadImageToCloudinary function for each file>. 
    
    - The <uploadImageToCloudinary function returns a Promise>, which resolves with the uploaded image URL if the upload is successful, and rejects with an error message if the upload fails.
    - takes an image buffer as input, which represents the binary data of the image. 
    - It then sets an options object with a folder path where the uploaded image will be stored in Cloudinary. 
    - The function then returns a new Promise, which creates a read stream from the image buffer using the streamifier module, and pipes it to the Cloudinary uploader. 
    - The uploader sends the image to Cloudinary, and when the upload is complete, it either resolves or rejects the Promise based on the success of the upload.
    - In summary, the given code provides functionality to upload images to Cloudinary, making use of Promises and the streamifier and cloudinary modules. It can be integrated into any Node.js project that requires image uploading to Cloudinary.