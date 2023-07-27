# NodeJS/Express API for Where Do I Go

## IMPORTANT

### Authentication (Request Headers)

1. **For each request** the authenticated user should include the access token in the request headers using the "Authorization" header field.

2. The token must be a JSON Web Token (JWT), returned from the server.

3. It should be prefixed with "Bearer" to comply with the server's authentication process.

> Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.{your_access_token}

Example:

```JS
 const response = await fetch(url, {
    method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        ...
    });

```

<br>

## Authentication

### POST /register

```json
{
  "email": "tester@yahoo.com",
  "password": "asdasd77", // Min 8 chars, at least 1 letter and 1 num (special chars allowed)
  "username": "Tester" // Alpha numeric username 2-12 chars
}
```

Returns:

```json
{
  "email": "tester@yahoo.com",
  "username": "Tester",
  // initial default url
  "avatarUrl": "https://res.cloudinary.com/degidchop/image/upload/v1690401797/avatars/reedeharqpql6jvjdwcs.png",
  "role": "user",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiNjRjMTc4MTgwMGY1Mj..."
}
```

**Technical Implementation**

1. [Data Validation (Yup)](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/user/userRegisterSchema.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/userServices/userRegister.js)
   - [generateUserToken](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/generateUserToken.js)
3. [User Mongoose Model](https://github.com/flnx/wheredoigo/blob/main/server/src/models/userSchema.js)

<br>

### POST /login

```json
{
  "email": "tester@yahoo.com",
  "password": "asdasd77"
}
```

Returns:

```json
{
  "email": "tester@yahoo.com",
  "username": "Tester",
  "avatarUrl": "https://res.cloudinary.com/degidchop/image/upload/v1690401797/avatars/reedeharqpql6jvjdwcs.png",
  "role": "user",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiNjRjMTc4MTgwMGY1Mj..."
}
```

**Technical Implementation**

1. [Data Validation (Yup)](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/user/userLoginSchema.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/userServices/userLogin.js)
   - [generateUserToken](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/generateUserToken.js)

<br>

## User Resource

### GET /user/favorites

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

1. Get all user likes (favorites)

returns:

```json
[
  {
    "_id": "646e78213d3b7387243fc4fc",
    "country": "Netherlands",
    "city": "Amsterdam",
    "imageUrls": "http://res.cloudinary.com/degidchop/image/upload/v1684961314/destinations/amsterdam-646e78213d3b7387243fc4fc/atvy1vfvl2jooliojoxw.jpg"
  },
  {
    "_id": "649a272ce046091e047012d3",
    "country": "Czech Republic",
    "city": "Prague",
    "imageUrls": "http://res.cloudinary.com/degidchop/image/upload/v1687824173/destinations/prague-649a272ce046091e047012d3/behpvxmpohibg25gsdlp.jpg"
  }
]
```

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/userServices/userFavorites.js)

<br>

### GET /user/activities

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

1. Last 3 user activities (Comments and Likes)
2. Total number of user comments, likes(favorites) and created destinations

returns:

```json
{
  "likes": [
    {
      "destinationId": "64a8fed0fc2c004f3f9ca1b3",
      "city": "Dresden",
      "date": "13 July 2023",
      "time": "14:18:08"
    },
    {
      "destinationId": "64b6e77f93848f1dff591baa",
      "city": "Veliko Tarnovo",
      "date": "27 July 2023",
      "time": "01:32:56"
    },
    {
      "destinationId": "649231795466cc1e6c46aa23",
      "city": "Kailua",
      "date": "27 July 2023",
      "time": "01:33:19"
    }
  ],
  "comments": [
    {
      "placeId": "6499f997e046091e04700fd0",
      "name": "Teorema Rooms",
      "title": "Great experience!",
      "content": "I had a wonderful stay at Teorema Rooms. The room was clean and comfortable, and the staff was friendly and helpful. Highly recommended!",
      "rating": 5,
      "date": "2 July 2023",
      "time": "10:29:15"
    },
    {
      "placeId": "649236755466cc1e6c46aa82",
      "name": "Lanikai Beach",
      "title": "Lovely beach",
      "content": "Great beach! The sand was really nice and it was not over crowded. I would highly recommend this to people visiting Honolulu. The only issue was that you need a car to get there.",
      "rating": 4,
      "date": "27 July 2023",
      "time": "01:33:43"
    },
    {
      "placeId": "64923dfe5466cc1e6c46ab99",
      "name": "Kailua Beach Park",
      "title": "Loved it.",
      "content": "Incredible. It was quiet and beautiful",
      "rating": 5,
      "date": "27 July 2023",
      "time": "01:36:51"
    }
  ],
  "hasNoActivity": false,
  "countComments": 93,
  "countCreated": 22,
  "countFavorites": 22
}
```

**NOTE**

> _If the user hasn't added any comments and hasn't liked anything yet, the likes and comments arrays will be empty and hasNoActivity will be set to true_

Example:

```json
{
  "comments": [],
  "likes": [],
  "hasNoActivity": true,
  "countComments": 0,
  "countCreated": 0,
  "countFavorites": 0
}
```

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. Service:
   - [Last Activities Totals Counter](https://github.com/flnx/wheredoigo/blob/main/server/src/services/userServices/userDashboardData.js)
   - [Last 3 Activities](https://github.com/flnx/wheredoigo/blob/main/server/src/services/userServices/userLastActivities.js)
3. [Activities Mongoose Model](https://github.com/flnx/wheredoigo/blob/main/server/src/models/userActivitiesSchema.js)

<br>

### PUT /user/avatar

Upload user avatar:

1. **avatarUrl** (file) - The avatar image file to be uploaded.

2. The server will interpret the file with the name **avatarUrl**

3. The old avatar will be automatically deleted after the new one is uploaded

Example:

```JS
const formData = new FormData()
formData.append('avatarUrl', avatarImageFile, 'avatar.jpg')

const changeUserAvatar = async (formData) => {
    const result = await axios.put(apiEndpoints.changeAvatar, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return result.data;
};
```

returns:

```json
{
  "email": "tester@abv.bg",
  "username": "Tester",
  // Uploaded image file URL
  "avatarUrl": "http://res.cloudinary.com/degidchop/image/upload/v1690404138/avatars/kmjsxnbcufe56ew20hwx.jpg",
  "role": "user",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiNjRjMTc4MTgwMGY1Mj..."
}
```

**Technical Implementation**

1. Middlewares:
   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [uploadAvatar middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/images.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/userServices/updateUserAvatar.js)
3. [validateImages](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/validators/validateImages.js)
4. [uploadUserAvatar](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/uploadUserAvatar.js)
5. [uploadImagesToCloudinary](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/upload/uploadImagesToCloudinary.js)
6. [uploadFile](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/upload/uploadFile.js)

<br>

### DELETE /user/delete

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

1. After the user deletes their account, it cannot be restored.
2. All of their comments and likes will be permanently removed.
3. However, the destinations and places they created will not be deleted; they will remain visible to other users.

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/userServices/deleteUserAccount.js)

<br>

## Destination Resource

### GET /destinations

Top 12 most liked destinations along with all destination sub-categories

Returns:

```json
{
  "results": [
    {
      "_id": "645b80b5afb7e42c0ba43fc8",
      "likesCount": 27,
      "imageUrls": "http://res.cloudinary.com/degidchop/image/upload/v1683718327/destinations/berlin-645b80b5afb7e42c0ba43fc8/tnjuvndtbpuq8yzkpptj.jpg",
      "city": "Berlin",
      "country": "Germany",
      "lastUserLikes": [
        {
          "username": "HilariousHobbit",
          "avatarUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687022584/avatars/vpfscp0owgvpvrxu6wng.jpg"
        },
        {
          "username": "skywalker",
          "avatarUrl": "http://res.cloudinary.com/degidchop/image/upload/v1685335585/avatars/fymlmiwhbh8o7akax6hv.jpg"
        },
        {
          "username": "Jenny",
          "avatarUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687014568/avatars/stfqoz82uiqbkleotite.jpg"
        }
      ]
    },
    {
      "_id": "649a0fcae046091e04701161",
      "likesCount": 24,
      "imageUrls": "http://res.cloudinary.com/degidchop/image/upload/v1687818186/destinations/dublin-649a0fcae046091e04701161/i2uiodlgsgb4fylu8ecr.jpg",
      "city": "Dublin",
      "country": "Ireland",
      "lastUserLikes": [
        {
          "username": "Elizabeth",
          "avatarUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687013300/avatars/qphr0yezzmjzbs2numri.jpg"
        },
        {
          "username": "Peshozavur",
          "avatarUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687004999/avatars/jiucl37ui8qta0nnr6bl.jpg"
        },
        {
          "username": "Steven",
          "avatarUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687136740/avatars/jo52ckxa4c8ttanj3qr7.jpg"
        }
      ]
    },
    ...
  ],
  "allowedCategories": [ "Beach", "Mountains", "Cultural", "Snow", "Islands", "Adventure" ]
}
```

**Technical Implementation**

1. [checkSession middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkSession.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/getMostLikedDestinations.js)3
3. [Destination Mongoose Model](https://github.com/flnx/wheredoigo/blob/main/server/src/models/destinationSchema.js)

<br>

