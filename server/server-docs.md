# NodeJS/Express Server API for Where Do I Go

## User Resource

### POST /register

```json
{
  "email": "test@yahoo.com",
  "password": "asdasd77", // Min 8 chars, at least 1 letter and 1 num (special chars allowed)
  "username": "ye" // Alpha numeric username 2-12 chars
}
```

### LOGIN

- Endpoint (POST): /login

  {
  email: "test",
  password: "test",
  }

1. Email: Valid and Unique
2. Password: At least 6 characters long and valid

### DESTINATIONS

- Endpoint (GET): /destinations

1. Returns max 9 destinations
2. In order too get less than 9 results use limit

- query: limit
- example: destinations?limit=5

3. in order to achieve PAGINATION, use page query

- query: page
- example: /destinations?page=3

4. to combine them:

- destinations?page=3&limit=4

### CREATE DESTINATION (Granted Accesss)

- Endpoint (POST):

1. JSON Info:

- country: It will be automatically created on the backend after checking the city
- city: (required and valid)
- description: (required and at least 10 characters long)
- details: not required but it will be automatically created on the client with empty fields for each category
- imageUrls: At least 3 images (blobs). The server will upload them to cloudinary and store the URLS for each Image (compressed).

2. Allowed Categories: (Might be Updated in Future)

- Good to Know
- Transport
- Local Customs
- Pro Tips

{
country: "",
city: "",
description: "",
details: [
{
category: "Transport",
info: [
{
title: "",
description: "",
},
{
title: "",
description: "",
},
...
],
},
..More Categories (if needed)
],
imageUrls: [file1, file2, file3...] // the server will return urls,
}

### CREATE PLACE

- Endpoint (POST): /places

### FETCH CITY DATA

- Endpoint (POST): /destinations/get-city-data

1. {
   city: "cityName"
   }

### A cloud-based image management service - Cloudinary and Image Handling

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
