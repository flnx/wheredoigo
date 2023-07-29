# NodeJS/Express API for Where Do I Go

## IMPORTANT

### Authentication (Request Headers)

1. **For each request** the authenticated user should include the access token in the request headers using the "Authorization" header field.

2. The token must be a JSON Web Token (JWT), returned from the server.

3. It should be prefixed with "Bearer" to comply with the server's authentication process.

4. Editing or deleting destinations and places is restricted to their owners (creators) or authorized moderators only.

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

---

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
  "avatarUrl": "https://res.cloudinary.com/degidchop/image//v1690401797/avatars/reedeharqpql6jvjdwcs.png",
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

---

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
  "avatarUrl": "https://res.cloudinary.com/degidchop/image//v1690401797/avatars/reedeharqpql6jvjdwcs.png",
  "role": "user",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiNjRjMTc4MTgwMGY1Mj..."
}
```

**Technical Implementation**

1. [Data Validation (Yup)](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/user/userLoginSchema.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/userServices/userLogin.js)
   - [generateUserToken](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/generateUserToken.js)

<br>

---

<br>

## User Resource

### GET /user/favorites

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

1. Get all user likes (favorites)

Returns:

```json
[
  {
    "_id": "646e78213d3b7387243fc4fc",
    "country": "Netherlands",
    "city": "Amsterdam",
    "imageUrls": "http://res.cloudinary.com/degidchop/image//v1684961314/destinations/amsterdam-646e78213d3b7387243fc4fc/atvy1vfvl2jooliojoxw.jpg"
  },
  {
    "_id": "649a272ce046091e047012d3",
    "country": "Czech Republic",
    "city": "Prague",
    "imageUrls": "http://res.cloudinary.com/degidchop/image//v1687824173/destinations/prague-649a272ce046091e047012d3/behpvxmpohibg25gsdlp.jpg"
  }
]
```

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/userServices/userFavorites.js)

<br>

---

<br>

### GET /user/activities

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

1. Last 3 user activities (Comments and Likes)
2. Total number of user comments, likes(favorites) and created destinations

Returns:

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

---

<br>

### PUT /user/avatar

Update user avatar:

1. **avatarUrl** (file) - The avatar image file to be ed.

2. The server will interpret the file with the name **avatarUrl**

3. The old avatar will be automatically deleted after the new one is added

Example:

```JS
const formData = new FormData()
formData.append('avatarUrl', avatarImageFile, 'avatar.jpg')

const changeUserAvatar = async () => {
    const result = await axios.put(apiEndpoints.changeAvatar, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return result.data;
};
```

Returns:

```json
{
  "email": "tester@abv.bg",
  "username": "Tester",
  // Add image file URL
  "avatarUrl": "http://res.cloudinary.com/degidchop/image//v1690404138/avatars/kmjsxnbcufe56ew20hwx.jpg",
  "role": "user",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lcklkIjoiNjRjMTc4MTgwMGY1Mj..."
}
```

**Technical Implementation**

1. Middlewares:
   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [uploadAvatar middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/images.js)
2. [Service: updateUserAvatar](https://github.com/flnx/wheredoigo/blob/main/server/src/services/userServices/updateUserAvatar.js)
3. [validatImageFile](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/validators/validateImages.js)
4. [uploadUserAvatar](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/upload/uploadImagesToCloudinary.js)
   - [uploadFile](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/upload/uploadFile.js)

<br>

---

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

---

<br>

## Destination Resource

### GET /destinations/top

Top 12 most liked destinations along with all destination sub-categories

Returns:

```json
{
  "results": [
    {
      "_id": "645b80b5afb7e42c0ba43fc8",
      "likesCount": 27,
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1683718327/destinations/berlin-645b80b5afb7e42c0ba43fc8/tnjuvndtbpuq8yzkpptj.jpg",
      "city": "Berlin",
      "country": "Germany",
      "lastUserLikes": [
        {
          "username": "HilariousHobbit",
          "avatarUrl": "http://res.cloudinary.com/degidchop/image//v1687022584/avatars/vpfscp0owgvpvrxu6wng.jpg"
        },
        {
          "username": "skywalker",
          "avatarUrl": "http://res.cloudinary.com/degidchop/image//v1685335585/avatars/fymlmiwhbh8o7akax6hv.jpg"
        },
        {
          "username": "Jenny",
          "avatarUrl": "http://res.cloudinary.com/degidchop/image//v1687014568/avatars/stfqoz82uiqbkleotite.jpg"
        }
      ]
    },
    {
      "_id": "649a0fcae046091e04701161",
      "likesCount": 24,
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1687818186/destinations/dublin-649a0fcae046091e04701161/i2uiodlgsgb4fylu8ecr.jpg",
      "city": "Dublin",
      "country": "Ireland",
      "lastUserLikes": [
        {
          "username": "Elizabeth",
          "avatarUrl": "http://res.cloudinary.com/degidchop/image//v1687013300/avatars/qphr0yezzmjzbs2numri.jpg"
        },
        {
          "username": "Peshozavur",
          "avatarUrl": "http://res.cloudinary.com/degidchop/image//v1687004999/avatars/jiucl37ui8qta0nnr6bl.jpg"
        },
        {
          "username": "Steven",
          "avatarUrl": "http://res.cloudinary.com/degidchop/image//v1687136740/avatars/jo52ckxa4c8ttanj3qr7.jpg"
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
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/getMostLikedDestinations.js)
3. [Destination Mongoose Model](https://github.com/flnx/wheredoigo/blob/main/server/src/models/destinationSchema.js)

<br>

---

<br>

### GET /destinations

Paginated Destination Search (Page Size - 8)

- The paginated destination search allows you to search for destinations (cities, countries) or filter them by categories...
  ...and receive results in a paginated format with a page size of 8 destinations per page.

> E.G. _/destinations?search=${searchParamsStr}&page=${pageNum}&categories=${categoriesArr}_

#### Default Behavior:

- Endpoint: _/destinations_
- Description: Returns the first 8 destinations if no queries have been applied.

#### Queries:

1. **?search**

   - **Description:** The destination (either a city or a country) to be searched for.

   - **Examples:**

     - _/destinations?search=Sofia_
     - _/destinations?search=Bulgaria_

2. **?page**

   - **Description:** How many pages to skip in order to get to the desired page.
   - **Page Size Limit:** The page size limit is set to 8 by default (currently can't be customized by the client).
   - **Next Page Param:** The server returns a nextPage parameter indicating how many pages to skip to get to the next page. If it's "null," that means there's no next page.

   - **Examples:**

     - _/destinations?page=0_ is equal to Page 1
     - _/destinations?page=8_ is equal to Page 2

> If "page" query is not provided, it will always be set to 0 by default, which means 1st page

3. **?categores** (Optional)

   - **Description**: Allows you to search for destinations based on specific categories.
   - **Available Categories**: ["Beach", "Mountains", "Cultural", "Snow", "Islands", "Adventure"]

   - **Examples:**

     - _/destinations?categories=["Cultural"]&page=0_
     - _/destinations?search=Bulgaria&page=1&categories=["Cultural"]_

#### Paginated Responses

**Endpoint:** _/destinations?search=Sofia&page=0_

```json
{
  "result": [
    {
      "_id": "6499d94e7ae6eac92fd96c02",
      "country": "Bulgaria",
      "city": "Sofia",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1687804238/destinations/sofia-6499d94e7ae6eac92fd96c02/fpjqmugddljrlo6lwrfb.jpg"
    }
  ],
  "nextPage": null
}
```

**Endpoint:** _/destinations?search=Bulgaria&page=0_

```json
{
  "result": [
    {
      "_id": "645b8de2afb7e42c0ba4400e",
      "country": "Bulgaria",
      "city": "Plovdiv",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1688561894/destinations/plovdiv-645b8de2afb7e42c0ba4400e/km3qfhpnsrjrxwqzvjv9.jpg"
    },
    {
      "_id": "64945e28dd1758dfdd696be9",
      "country": "Bulgaria",
      "city": "Nesebar",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1687445031/destinations/nesebar-64945e28dd1758dfdd696be9/dvhwvuqzqruhjmihsymc.jpg"
    },
    {
      "_id": "6495dfe8ef146e69c5aa1b6f",
      "country": "Bulgaria",
      "city": "Bansko",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1687543785/destinations/bansko-6495dfe8ef146e69c5aa1b6f/lzk6oubekgw0oo06awnq.jpg"
    },
...
  ],
  "nextPage": 8
}
```

**Endpoint:** _/destinations?page=8_

Returns:

```json
{
  "result": [
    {
      "_id": "6492cc99ec09aa8d098c33d0",
      "country": "United States",
      "city": "Honolulu",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1687342233/destinations/honolulu-6492cc99ec09aa8d098c33d0/a9uzpqd0damez437f1qi.jpg"
    },
    {
      "_id": "64935d9823621c42ba898c2b",
      "country": "Maldives",
      "city": "Maafushi Island",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1687379352/destinations/maafushi-island-64935d9823621c42ba898c2b/ckn5l3zykpupgd6zzumf.jpg"
    },
    {
      "_id": "64945e28dd1758dfdd696be9",
      "country": "Bulgaria",
      "city": "Nesebar",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1687445031/destinations/nesebar-64945e28dd1758dfdd696be9/dvhwvuqzqruhjmihsymc.jpg"
    },
...
  ],
  "nextPage": 16
}
```

**Endpoint:** _/destinations?categories=["adventure", "mountain"]&page=8_

```json
{
  "result": [
    {
      "_id": "645b7f82afb7e42c0ba43fa4",
      "country": "United States",
      "city": "San Diego",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1683718019/destinations/san-diego-645b7f82afb7e42c0ba43fa4/c6neoiwdvmirj2hmv010.jpg"
    },
    {
      "_id": "645b80b5afb7e42c0ba43fc8",
      "country": "Germany",
      "city": "Berlin",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1683718327/destinations/berlin-645b80b5afb7e42c0ba43fc8/tnjuvndtbpuq8yzkpptj.jpg"
    },
    {
      "_id": "645b8de2afb7e42c0ba4400e",
      "country": "Bulgaria",
      "city": "Plovdiv",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1688561894/destinations/plovdiv-645b8de2afb7e42c0ba4400e/km3qfhpnsrjrxwqzvjv9.jpg"
    },
...
  ],
  "nextPage": 16
}
```

**Endpoint:** _/destinations?search=Bulgaria&page=0&categories=["Cultural"]_

```json
{
  "result": [
    {
      "_id": "64945e28dd1758dfdd696be9",
      "country": "Bulgaria",
      "city": "Plovdiv",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1687445031/destinations/nesebar-64945e28dd1758dfdd696be9/dvhwvuqzqruhjmihsymc.jpg"
    },
    {
      "_id": "6495dfe8ef146e69c5aa1b6f",
      "country": "Bulgaria",
      "city": "Bansko",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1687543785/destinations/bansko-6495dfe8ef146e69c5aa1b6f/lzk6oubekgw0oo06awnq.jpg"
    },
    {
      "_id": "6499d94e7ae6eac92fd96c02",
      "country": "Bulgaria",
      "city": "Sofia",
      "imageUrls": "http://res.cloudinary.com/degidchop/image//v1687804238/destinations/sofia-6499d94e7ae6eac92fd96c02/fpjqmugddljrlo6lwrfb.jpg"
    }
  ],
  "nextPage": 8
}
```

**Technical Implementation**

1. [checkSession middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkSession.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/searchDestinationsPaginated.js)
3. [MongoDB search pipelines](https://github.com/flnx/wheredoigo/blob/main/server/src/pipelines/paginatedSearchPipeline.js)

<br>

---

<br>

### GET /destinations/countries-and-cities

All world countries and cities

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

Returns:

```json
{
  "error": false,
  "msg": "countries and cities retrieved",
  "data": [
    {
      "iso2": "AF",
      "iso3": "AFG",
      "country": "Afghanistan",
      "cities": [
        "Herat",
        "Kabul",
        "Kandahar",
        "Molah",
        "Rana",
        "Shar",
        "Sharif",
        "Wazir Akbar Khan"
      ]
    },
    {
      "iso2": "AL",
      "iso3": "ALB",
      "country": "Albania",
      "cities": [
        "Elbasan",
        "Petran",
        "Pogradec",
        "Shkoder",
        "Tirana",
        "Ura Vajgurore"
      ]
    }
  ]
  ...
}
```

**Technical Implementation**

_NOTE_: Uses eternal API to fetch the data

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. [Service: fetchCountriesAndCities](https://github.com/flnx/wheredoigo/blob/main/server/src/services/getCityCountryData.js)

<br>

---

<br>

### GET /destinations/created-by-user

All destinations created by the user

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

Returns:

```json
[
  {
    "_id": "645b7f82afb7e42c0ba43fa4",
    "country": "United States",
    "city": "San Diego",
    "imageUrls": "http://res.cloudinary.com/degidchop/image//v1683718019/destinations/san-diego-645b7f82afb7e42c0ba43fa4/c6neoiwdvmirj2hmv010.jpg"
  },
  {
    "_id": "645b80b5afb7e42c0ba43fc8",
    "country": "Germany",
    "city": "Berlin",
    "imageUrls": "http://res.cloudinary.com/degidchop/image//v1683718327/destinations/berlin-645b80b5afb7e42c0ba43fc8/tnjuvndtbpuq8yzkpptj.jpg"
  },
  {
    "_id": "645b8de2afb7e42c0ba4400e",
    "country": "Bulgaria",
    "city": "Plovdiv",
    "imageUrls": "http://res.cloudinary.com/degidchop/image//v1688561894/destinations/plovdiv-645b8de2afb7e42c0ba4400e/km3qfhpnsrjrxwqzvjv9.jpg"
  },
  ...
]
```

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/getCreatorDestinations.js)

<br>

---

<br>

### GET /destinations/:id'

Single Destination Details

Returns:

```json
{
  "_id": "648f4e52cdbe02c435ff2048",
  "description": "<h3>Budapest, the enchanting capital city of Hungary</h3><p>Known as the <strong><em>\"Pearl of the Danube\",</em></strong>...</p>",
  "category": ["Cultural"],
  "details": [
    {
      "name": "Good to Know",
      "content": "",
      "_id": "64b3df625a9cac9e8adac128"
    },
    {
      "name": "Transport",
      "content": "",
      "_id": "64b3df625a9cac9e8adac129"
    },
    {
      "name": "Local Customs",
      "content": "",
      "_id": "64b3df625a9cac9e8adac12a"
    },
    {
      "name": "Pro Tips",
      "content": "",
      "_id": "64b3df625a9cac9e8adac12b"
    }
  ],
  "__v": 1,
  "likesCount": 8,
  "isOwner": true,
  "imageUrls": [
    {
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1687113299/destinations/budapest-648f4e52cdbe02c435ff2048/ajxri3sqblu01eqcol4x.jpg",
      "_id": "648f4e55cdbe02c435ff205e"
    },
    {
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1687113299/destinations/budapest-648f4e52cdbe02c435ff2048/nk1kr5j29beuedf5yxj3.jpg",
      "_id": "648f4e55cdbe02c435ff205f"
    },
    {
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1687113299/destinations/budapest-648f4e52cdbe02c435ff2048/gcpgznu26yodzz7p0gev.jpg",
      "_id": "648f4e55cdbe02c435ff2060"
    },
  ...
  ],
  "country": "Hungary",
  "city": "Budapest",
  "isLikedByUser": true,
  "hasSession": true,
  "places": [
    {
      "_id": "648f5163cdbe02c435ff207b",
      "type": "Fun",
      "averageRating": 4.5,
      "name": "Bar 360",
      "city": "Budapest",
      "country": "Hungary",
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1687114084/places/budapest-648f5163cdbe02c435ff207b/hwyuyyjd0vzld7qikytv.jpg"
    },
    {
      "_id": "648f536bcdbe02c435ff209c",
      "type": "Explore",
      "averageRating": 4.27,
      "name": "Buda Castle & Castle Hill",
      "city": "Budapest",
      "country": "Hungary",
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1687114604/places/budapest-648f536bcdbe02c435ff209c/jorcnqkrlhzrcadz1caw.jpg"
    },
   ...
  ]
}
```

**Technical Implementation**

1. [checkSession middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkSession.js)
2. Service

   - [getDestinationById](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/getDestinationById.js)
   - [getDestinationPlaces](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/getDestinationPlaces.js)

<br>

---

<br>

### GET /destinations/:id/request-edit-permissions

Request edit permissions and get destination data to edit

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

Returns:

```json
{
  "_id": "646e78213d3b7387243fc4fc",
  "description": "<p><strong>Amsterdam </strong>is the capital and largest city in the European country of the Netherlands. Amsterdam is famous for its canals and dikes</p>",
  "category": ["Cultural"],
  "details": [
    {
      "name": "Good to Know",
      "content": "",
      "_id": "64b3df625a9cac9e8adac128"
    },
    {
      "name": "Transport",
      "content": "",
      "_id": "64b3df625a9cac9e8adac129"
    },
    {
      "name": "Local Customs",
      "content": "",
      "_id": "64b3df625a9cac9e8adac12a"
    },
    {
      "name": "Pro Tips",
      "content": "",
      "_id": "64b3df625a9cac9e8adac12b"
    }
  ],
  "__v": 1,
  "likesCount": 19,
  "isOwner": true,
  "imageUrls": [
    {
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1684961314/destinations/amsterdam-646e78213d3b7387243fc4fc/atvy1vfvl2jooliojoxw.jpg",
      "_id": "646e78243d3b7387243fc512"
    },
    {
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1684961314/destinations/amsterdam-646e78213d3b7387243fc4fc/l2xjuo0xktjtwxp6p6oq.jpg",
      "_id": "646e78243d3b7387243fc513"
    },
   ...
  ],
  "country": "Netherlands",
  "city": "Amsterdam",
  "isLikedByUser": true,
  "hasSession": true,
  "places": [
    {
      "_id": "646e788687367f3c46abe56c",
      "type": "Explore",
      "averageRating": 4.55,
      "name": "Anne Frank House",
      "city": "Amsterdam",
      "country": "Netherlands",
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1684961414/places/amsterdam-646e788687367f3c46abe56c/jobka2ar7nmqghrataxv.jpg"
    },
    {
      "_id": "646e86401fb95037888ee213",
      "type": "Explore",
      "averageRating": 4.36,
      "name": "Cannibale Royale",
      "city": "Amsterdam",
      "country": "Netherlands",
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1684965117/places/amsterdam-646e86401fb95037888ee213/pbqyd5ss2ou6mxcjxmki.jpg"
    },
   ...
  ],
  "allowedCategories": [
    "Beach",
    "Mountains",
    "Cultural",
    "Snow",
    "Islands",
    "Adventure"
  ]
}
```

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. Service
   - [getDestinationById](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/getDestinationById.js)
   - [getDestinationPlaces](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/getDestinationPlaces.js)

<br>

---

<br>

### GET /destinations/:id/places/add

Add new Place GET Request that returns the allowed place categories and the destination name (city)

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

```json
{
  "city": "San Diego",
  "allowedPlaceCategories": ["Explore", "Eat", "Fun"]
}
```

<br>

---

<br>

### POST /destinations

Create a new destination

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

#### Destination data

```JS
{
  // Description must be between 50-5000 characters (Without the html tags, if any)
  description: "<p>Blagoevgrad is а town in Southwestern Bulgaria, the administrative centre of Blagoevgrad Municipality and of Blagoevgrad Province.</p>",
  // Real city
  city: "Blagoevgrad",
  // Real country
  country: "Bulgaria",
  // At least one of the allowed categories: ["Beach", "Mountains", "Cultural", "Snow", "Islands", "Adventure"]
  categories: [ "Cultural", "Mountains"],
  // Details content can be be betwen 0 - 2000 characters
  details: [
    {
      name: "Good to Know",
      content: "<p>Just some info...</p>"
    },
    {
      name: "Transport",
      content: ""
    },
    {
      name: "Local Customs",
      content: ""
    },
    {
      name: "Pro Tips",
      content: ""
    }
  ],
  // Between 5-50
  imageUrls: [imageFile1, imageFile2, imageFile3]
}
```

#### Images

1. **imageUrls** (files) - The image files to be added.

2. The server will interpret the files with the name **imageUrls**

Example

```JS
...
    const formData = new FormData();

    formData.append('city', state.city);
    formData.append('country', state.country);
    formData.append('description', state.description.text);
    formData.append('categories', JSON.stringify(state.categories));
    formData.append('details', JSON.stringify(state.details));
    formData.append('imageUrls', imageFiles);
    ...

    const createDestination = async () => {
    const res = await axios.post('/destinations/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};
```

Returns:

```json
{
  "_id": "64c2b40636950267714c1ed5",
  "imgError": null
}
```

**Technical Implementation**

1. Middlewares:

   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [checkDestinationOwnershipOnly](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkDestinationOwnership.js)
   - [multer upload middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/images.js)
   - [validateCreateDestinationData](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/dataValidators/validateCreateDestinationData.js)
     - [Yup Validation: createDestinationSchema](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/destination/createDestinationSchema.js)
   - [imagesValidation](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/validators/validateImages.js)

2. Service:

   - [createDestination](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/createDestination.js)
     - [uploadImages (setting up the files)](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/uploadImages.js)
       - [uploadImagesToCloudinary (Upload all and error checks)](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/upload/uploadImagesToCloudinary.js)
         - [uploadFile (cloudinary + streamifier)](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/upload/uploadFile.js)

3. [Mongoose Model](https://github.com/flnx/wheredoigo/blob/main/server/src/models/destinationSchema.js)

<br>

---

<br>

### POST /destinations/:id/places/add

Creates a new place that corresponds to the destination ID

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

#### Place data

```JS
{
    // Between 1 and 60 characters
    name: "Burgermeister",
    // Description must be between 50-5000 characters (Without the html tags, if any)
    description: "There are plenty of great burgers found in Berlin, but none are quite as iconic as Burgermeister’s.",
    // At least one of the allowed types: ["Explore", "Eat", "Fun"]
    type: "Fun",
    // Between 5-50
    imageUrls: [imageFile1, imageFile2, imageFile3]
}
```

#### Images

1. **imageUrls** (files) - The image files to be added.

2. The server will interpret the files with the name **imageUrls**

Example

```JS
...
    const formData = new FormData();

    formData.append('name', state.name);
    formData.append('description', state.description);
    formData.append('categories', JSON.stringify(state.type));
    formData.append('imageUrls', imageFiles);
    ...

    const createPlace = async () => {
    const res = await axios.post('/destinations/:id/places/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};
```

Returns:

```json
{
  "_id": "649a2b9ce046091e04701370",
  "imgError": null
}
```

**Technical Implementation**

1. Middlewares:

   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [checkDestinationOwnershipOnly](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkDestinationOwnership.js)
   - [multer upload middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/images.js)
     - [Yup Validation: createNewPlaceSchema](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/place/createNewPlaceSchema.js)
   - [imagesValidation](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/validators/validateImages.js)

2. Service:

   - [createNewPlace](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/createNewPlace.js)
     - [uploadImages (setting up the files)](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/uploadImages.js)
       - [uploadImagesToCloudinary (Upload all and error checks)](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/upload/uploadImagesToCloudinary.js)
         - [uploadFile (cloudinary + streamifier)](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/upload/uploadFile.js)

3. [Mongoose Model](https://github.com/flnx/wheredoigo/blob/main/server/src/models/placeSchema.js)

<br>

---

<br>

### POST /destinations/:id/like

Like a destination

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

Example:

```JS
const likeDestination = async () => {
    // Just send an empty object. The user information will be extracted from the access token
    const res = await axios.post(api.likeDestination('/destinations/:id/like'), {});

    return res.data;
};
```

Returns:

```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

**NOTES**

1. After you've liked a destination, it will automatically be added to the user's like activity
2. The destination ID will be added to the user's list of favorite destinations.
3. When the client fetches a single destination (by id), the _isLikedByUser_ field will be set to _true_

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. Service:
   - [likeDestination](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/likeDestination.js)

<br>

---

<br>

### POST /destinations/:id/dislike

Dislike a destination

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

Example:

```JS
const dislikeDestination = async () => {
    // Just send an empty object. The user information will be extracted from the access token
    const res = await axios.post(api.likeDestination('/destinations/:id/dislike'), {});

    return res.data;
};
```

Returns:

```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

**NOTES**

1. After you've disliked a destination, it will automatically be removed from the user's like activity
2. The destination ID will be removed from user's list of favorite destinations.
3. When the client fetches a single destination (by id), the _isLikedByUser_ field will be set to _false_

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. Service:
   - [dislikeDestination](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/dislikeDestination.js)

<br>

---

<br>

### PUT /destinations/:id/delete-image

Delete destination image

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

Example:

```json
{
  "imgId": "646e78243d3b7387243fc512"
}
```

Returns:

```json
{
  "deleted": true
}
```

**Technical Implementation**

1. Middlewares:
   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [checkDestinationOwnershipOnly](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkDestinationOwnership.js)
   - [Validation: deleteSchema](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/deleteImageSchema.js)
2. Service:
   - [deleteDestinationImage](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/deleteDestinationImage.js)
   - [deleteImages setting up](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/deleteImages.js)
   - [deleteImageFromCloudinary](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/delete/deleteImageFromCloudinary.js)

<br>

---

<br>

### PUT /destinations/:id/add-images

Add destination new images

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

1. **imageUrls** (files) - The image files to be added.

2. The server will interpret the files with the name **imageUrls**

Example:

```JS
    const formData = new FormData();

    formData.append('imageUrls', [imageFile1, imageFile2]);
    ...

    const addDestinationNewImages = async () => {
    const res = await axios.put('/destinations/:id/add-images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};
```

Returns:

```json
{
  "imageUrls": [
    {
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1690489402/destinations/veliko-tarnovo-64b6e77f93848f1dff591baa/v0tpgesdgm5e5bewwo2s.jpg",
      "_id": "64c2d23c36950267714c1f94"
    },
    {
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1690489402/destinations/veliko-tarnovo-64b6e77f93848f1dff591baa/v0tpgesdgm5e5bewwo2s.jpg",
      "_id": "64c2d23c36950267714c1f95"
    }
  ],
  "imgError": null
}
```

**Technical Implementation**

1. Middlewares:

   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [checkDestinationOwnershipOnly](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkDestinationOwnership.js)
   - [multer upload middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/images.js)
   - [validateImages](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/validators/validateImages.js)

2. Service:

   - [addDestinationNewImages](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/addDestinationNewImages.js)
     - [uploadImages](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/uploadImages.js)
     - [uploadImagesToCloudinary](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/upload/uploadImagesToCloudinary.js)

<br>

---

<br>

### PUT /destinations/:id/description

Edit destination description

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

```json
{
  // Min 50 characters, Max 5000 characters (without the html tags, if any)
  "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>"
}
```

Returns:

```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

**Technical Implementation**

1. Middlewares:

   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [checkDestinationOwnershipOnly](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkDestinationOwnership.js)
   - [Yup Validation: editDestDescriptionSchema](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/destination/editDestDescriptionSchema.js)

2. Service:

   - [editDescription](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/editDescription.js)
   - [sanitizeHtmlString](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/validators/sanitizeHtmlString.js)

<br>

---

<br>

### PUT /destinations/:id/details

Edit destination details

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

```json
{
  // Between 0 - 2000 characters (without the html tags, if any)
  "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
  "detail_id": "64b6e77f93848f1dff591bab"
}
```

Returns:

```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

**Technical Implementation**

1. Middlewares:

   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [checkDestinationOwnershipOnly](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkDestinationOwnership.js)
   - [Yup Validation: editDestDetailsSchema](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/destination/editDestDetailsSchema.js)

2. Service:

   - [editDetails](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/editDetails.js)
   - [sanitizeHtmlString](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/validators/sanitizeHtmlString.js)

<br>

---

<br>

### PUT /destinations/:id/categories

Edit destination categories

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

```json
{
  // At least one of the followed categories: ["Beach", "Mountains", "Cultural", "Snow", "Islands", "Adventure"]
  "categories": ["Snow", "Mountains"]
}
```

Returns:

```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

**Technical Implementation**

1. Middlewares:

   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [checkDestinationOwnershipOnly](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkDestinationOwnership.js)
   - [Yup Validation: editDestCategoriesSchema](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/destination/editDestCategoriesSchema.js)

2. Service:

   - [editCategories](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/editCategories.js)

<br>

---

<br>

### DELETE /destinations/:id/delete

Deletes the destination

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

**NOTE**

1. The destination will be permanently deleted.
2. All places associated with the destination will also be permanently deleted.
3. All comments on the places will be permanently deleted.
4. Any user activities related to the destination and its places will be permanently deleted.

Example:

```js
const deleteDestination = async (destinationId) => {
  const result = await axios.delete(`/destinations/:id/delete${destinationId}`);

  return result.data;
};
```

Returns:

```json
{
  "message": "deleted 🦖"
}
```

**Technical Implementation**

1. Middlewares:

   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)

2. Service:

   - [deleteDestination](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/deleteDestination.js)
   - [deleteImages setting up](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/deleteImages.js)
   - [deleteImageFromCloudinary](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/delete/deleteImageFromCloudinary.js)

<br>

---

<br>

## Destination Resource

### /places/top

- Top 12 highest rated european places that match "Explore" category
- Top 12 highest rated european places that match "Eat" category

Currently applied for the following euroopean countries:

- Netherlands, Bulgaria, Germany, Hungary

Returns:

```json
{
  "explorePlaces": [
    {
      "_id": "646e88bb67440d711c085186",
      "type": "Explore",
      "averageRating": 4.636363636363637,
      "name": "Rijksmuseum",
      "city": "Amsterdam",
      "country": "Netherlands",
      "imageUrl": "http://res.cloudinary.com/degidchop/image/upload/v1684965563/places/amsterdam-646e88bb67440d711c085186/a7gguqetnjbyyza0k080.jpg"
    },
    {
      "_id": "648f56dccdbe02c435ff20de",
      "type": "Explore",
      "averageRating": 5,
      "name": "The Danube Promenade",
      "city": "Budapest",
      "country": "Hungary",
      "imageUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687115485/places/budapest-648f56dccdbe02c435ff20de/zqanpsmors5jutxdldnn.jpg"
    }
    // ...
  ],
  "eatPlaces": [
    {
      "_id": "648f5630cdbe02c435ff20ce",
      "type": "Eat",
      "averageRating": 4,
      "name": "Spíler Bistro",
      "city": "Budapest",
      "country": "Hungary",
      "imageUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687115313/places/budapest-648f5630cdbe02c435ff20ce/a5drr9kv8cwke8zv0cgc.jpg"
    },
    {
      "_id": "646e87a367440d711c08514a",
      "type": "Eat",
      "averageRating": 4.181818181818182,
      "name": "Box Sociaal",
      "city": "Amsterdam",
      "country": "Netherlands",
      "imageUrl": "http://res.cloudinary.com/degidchop/image/upload/v1684965284/places/amsterdam-646e87a367440d711c08514a/q79ss1fvmtjmratw6nnf.jpg"
    }
    // ...
  ]
}
```

**Technical Implementation**

1. [checkSession middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkSession.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/getTopPlaces.js)
   - [mongoDB searchPipeline](https://github.com/flnx/wheredoigo/blob/main/server/src/pipelines/topPlacesPipeline.js)
3. [Mongoose Model](https://github.com/flnx/wheredoigo/blob/main/server/src/models/placeSchema.js)

<br>

---

<br>

All places created by the user

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

Returns:

```json
[
  {
    "_id": "645b7f82afb7e42c0ba43fa4",
    "country": "United States",
    "city": "San Diego",
    "imageUrls": "http://res.cloudinary.com/degidchop/image//v1683718019/destinations/san-diego-645b7f82afb7e42c0ba43fa4/c6neoiwdvmirj2hmv010.jpg"
  },
  {
    "_id": "645b80b5afb7e42c0ba43fc8",
    "country": "Germany",
    "city": "Berlin",
    "imageUrls": "http://res.cloudinary.com/degidchop/image//v1683718327/destinations/berlin-645b80b5afb7e42c0ba43fc8/tnjuvndtbpuq8yzkpptj.jpg"
  },
  {
    "_id": "645b8de2afb7e42c0ba4400e",
    "country": "Bulgaria",
    "city": "Plovdiv",
    "imageUrls": "http://res.cloudinary.com/degidchop/image//v1688561894/destinations/plovdiv-645b8de2afb7e42c0ba4400e/km3qfhpnsrjrxwqzvjv9.jpg"
  },
  ...
]
```

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/destinationServices/getCreatorDestinations.js)

<br>

---

<br>

### GET /places/created-by-user/ratings

All user places ratings data

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

Returns:

```json
[
  {
    "name": "Kapana Neighborhood",
    "data": [
      {
        "rating": "1 star ",
        "totalVotes": 1
      },
      {
        "rating": "2 stars ",
        "totalVotes": 0
      },
      {
        "rating": "3 stars ",
        "totalVotes": 1
      },
      {
        "rating": "4 stars ",
        "totalVotes": 2
      },
      {
        "rating": "5 stars ",
        "totalVotes": 5
      }
      ...
    ]
  },
  {
    "name": "Old Town Hall With Astronomical Clock",
    "data": [
      {
        "rating": "1 star ",
        "totalVotes": 0
      },
      {
        "rating": "2 stars ",
        "totalVotes": 2
      },
      {
        "rating": "3 stars ",
        "totalVotes": 1
      },
      {
        "rating": "4 stars ",
        "totalVotes": 4
      },
      {
        "rating": "5 stars ",
        "totalVotes": 4
      }
      ...
    ]
  },
  {
    "name": "Ancient Theatre",
    "data": []
  },
  {
    "name": "Asen's Fortress",
    "data": []
  },
  ...
]
```

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/getCreatorPlacesRatingData.js)

<br>

---

<br>

### GET /places/:id

Single Place Details

Returns:

```json
{
  "_id": "649a2b9ce046091e04701370",
  "destinationId": "649a272ce046091e047012d3", // parent destination
  "type": "Explore",
  "name": "Prague Castle",
  "city": "Prague",
  "country": "Czech Republic",
  "description": "Prague Castle, known as Pražský hrad in Czech, is a historic fortress complex and...",
  "imageUrls": [
    {
      "_id": "649a2b9ee046091e04701372",
      "imageUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687825308/places/prague-649a2b9ce046091e04701370/fbaymbnotugcf47mqt7j.jpg"
    },
    {
      "_id": "649a2b9ee046091e04701373",
      "imageUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687825308/places/prague-649a2b9ce046091e04701370/vo78d7ltpp17c8xqzwfh.jpg"
    },
   ...
  ],
  "isAuth": true, // checks the session
  "hasCommented": true, // tells if the current user (session) left a comment
  "averageRating": 4.18,
  "isOwner": true, // tells if the logged user (session) is the creator of that place
  "hasAIComments": false // tells if it has AI generated comments by all bots (commenters)
}
```

**Technical Implementation**

1. [checkSession middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkSession.js)
2. [Service](<(https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/getPlaceById.js)>)

<br>

---

<br>

### GET /places/:id/comments/

Place comments (Paginated)

**_Queries_**

2. **?page**

   - **Description:** Navigate through the comments. The server also returns _totalPages_ (number) and _hasNextPage_ / _hasPreviousPage_ (booleans) page parameters
   - **Page Size Limit:** 5

   - **Examples:**

     - _/places/:id/comments?page=1_
     - _/places/:id/comments?page=2_

Returns:

```json
{
  "data": [
    {
      "_id": "649fb9dd2916fa24d1bf350a",
      "title": "A must-see in Prague",
      "content": "Visiting Prague Castle is an absolute must when in Prague. The castle's beauty and historical significance make it a top attraction.",
      "ownerId": {
        "username": "Steven",
        "avatarUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687136740/avatars/jo52ckxa4c8ttanj3qr7.jpg"
      },
      "placeId": "649a2b9ce046091e04701370",
      "rating": 5,
      "time": "2023-07-01T05:30:05.664Z",
      "__v": 0,
    },
    {
      "_id": "649fb9dd2916fa24d1bf3509",
      "title": "Fascinating exhibitions",
      "content": "The exhibitions within the castle offer a deep insight into Czech history. They are well-curated and provide a great learning experience.",
      "ownerId": {
        "username": "Hilarioushobbit",
        "avatarUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687022584/avatars/vpfscp0owgvpvrxu6wng.jpg"
      },
      "placeId": "649a2b9ce046091e04701370",
      "rating": 4,
      "time": "2023-07-01T05:30:05.664Z",
      "__v": 0,
    },
... 3 more comments
  ],
  "totalComments": 11,
  "hasNextPage": true,
  "hasPreviousPage": false,
  "totalPages": 3
}
```

**Technical Implementation**

1. [checkSession middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkSession.js)
2. [Service](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/getPlaceComments.js)

<br>

---

<br>

## GET /places/:id/request-edit-permissions

Request edit permissions and get Place data to edit

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

Returns:

```json
{
  "_id": "648f557ecdbe02c435ff20be",
  "destinationId": "648f4e52cdbe02c435ff2048",
  "type": "Explore",
  "name": "The Museum Of Fine Arts",
  "city": "Budapest",
  "country": "Hungary",
  "description": "The Museum of Fine Arts (Szépmuvészeti Múzeum) is not only Budapest's...",
  "imageUrls": [
    {
      "_id": "648f5580cdbe02c435ff20c0",
      "imageUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687115134/places/budapest-648f557ecdbe02c435ff20be/qh5t3mv3ahkqqgamjqyz.jpg"
    },
    {
      "_id": "648f5580cdbe02c435ff20c1",
      "imageUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687115134/places/budapest-648f557ecdbe02c435ff20be/lykwcvqmzoigxvq50jzp.jpg"
    },
   ...
  ],
  "isAuth": true,
  "hasCommented": false,
  "averageRating": 4.83,
  "isOwner": true,
  "hasAIComments": false,
  "allowedPlaceCategories": ["Explore", "Eat", "Fun"]
}
```

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. [fetchPlaceAndCheckOwnership middlware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkPlaceOwnership.js)
3. [Service: getPlaceById](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/getPlaceById.js)

<br>

---

<br>

### POST /places/:id/generate-ai-comments

Generate openAI place comments and rating

- The comments will be based on the place name and destination (city)
- Number of AI generated comments: 10

Example:

Let's say the place name is _German Historical Museum_ in _Berlin_

Just send an empty object to the following endpoint:

```JS
const generateAIComments = async (placeId) => {
    const comment = await axios.post('/places/:id/generate-ai-comments', {});

    return comment.data;
};
```

Returns:

```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

- The comments will be added to the place
- They will have a fake owner

Like that:

```json
[
  {
    "_id": "64a35e2a262bd1ed1919e849",
    "title": "A treasure trove of artifacts",
    "content": "The German Historical Museum is a treasure trove of artifacts that offer a glimpse into Germany's rich history. From ancient relics to World War memorabilia, there is something for everyone here. The museum staff is also knowledgeable and friendly, adding to the overall experience.",
    "ownerId": {
      "username": "Angrydentist",
      "avatarUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687017090/avatars/l4o8qqixlknnd124jawd.jpg"
    },
    "placeId": "648f3e7acdbe02c435ff1fa7",
    "rating": 4,
    "time": "2023-07-03T23:47:54.068Z",
    "__v": 0,
    "isOwner": true
  },
  {
    "_id": "64a35e2a262bd1ed1919e84a",
    "title": "Not worth the hype",
    "content": "I had high expectations for the German Historical Museum, but it fell short of the hype. The exhibits lacked depth and failed to provide a comprehensive understanding of German history. Additionally, the museum was overcrowded, making it difficult to fully appreciate the displays.",
    "ownerId": {
      "username": "Mysticmuffinmaster",
      "avatarUrl": "http://res.cloudinary.com/degidchop/image/upload/v1687020294/avatars/yzfsdzjt84uca0gvy1sn.jpg"
    },
    "placeId": "648f3e7acdbe02c435ff1fa7",
    "rating": 2,
    "time": "2023-07-03T23:47:54.068Z",
    "__v": 0,
    "isOwner": true
  }
  ... 8 more comments
]
```

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. [checkPlaceOwnershipAndCommenters middlware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkPlaceOwnership.js)
3. Service:
   - [addAIGeneratedCommentsToPlace](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/addAIGeneratedCommentsToPlace.js)
   - [commentsGeneratedByAI](https://github.com/flnx/wheredoigo/blob/main/server/src/services/openAI/commentsGeneratedByAI.js)
     - [fetchAIComments](https://github.com/flnx/wheredoigo/blob/main/server/src/services/openAI/fetchAIComments.js)
     - [validateMultipleCommentsData](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/attachIDsToComments.js)

<br>

---

<br>

### POST /places/:id/comment

Add comment to a a place

```JS
{
    // Between 2 and 100 characters
    title: "Cool",
    // Between 10 and 2000 characters
    content: "Hello there"
    // Between 1 and 5
    rating: 5,
}
```

Returns the updated average place rating

```json
{
  "averageRating": "4.33"
}
```

**Technical Implementation**

1. [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
2. [Yup: validatePlaceComment Schema](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/place/addCommentSchema.js)
3. Service:
   - [addCommentToPlace](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/addCommentToPlace.js)
4. [Mongoose Comment Model](https://github.com/flnx/wheredoigo/blob/main/server/src/models/commentSchema.js)

<br>

---

<br>

### PUT /places/:id/add-images

Add place new images

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

1. **imageUrls** (files) - The image files to be added.

2. The server will interpret the files with the name **imageUrls**

Example:

```JS
    const formData = new FormData();

    formData.append('imageUrls', [imageFile1, imageFile2]);
    ...

    const addPlaceNewImages = async () => {
    const res = await axios.put('/places/:id/add-images', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return res.data;
};
```

Returns:

```json
{
  "imageUrls": [
    {
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1690489402/places/castle-hill-64b6e77f93848f1dff591baa/v0tpgesdgm5e5bewwo2s.jpg",
      "_id": "64c2d23c36950267714c1f94"
    },
    {
      "imageUrl": "http://res.cloudinary.com/degidchop/image//v1690489402/places/castle-hill-64b6e77f93848f1dff591baa/v0tpgesdgm5e5bewwo2s.jpg",
      "_id": "64c2d23c36950267714c1f95"
    }
  ],
  "imgError": null
}
```

**Technical Implementation**

1. Middlewares:

   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [checkPlaceOwnershipOnly](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkPlaceOwnership.js)
   - [multer upload middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/images.js)
   - [validateImages](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/validators/validateImages.js)

2. Service:

   - [addPlaceNewImages](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/addPlaceNewImages.js)
     - [uploadImages](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/uploadImages.js)
     - [uploadImagesToCloudinary](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/upload/uploadImagesToCloudinary.js)

<br>

---

<br>

### PUT /places/:id/delete-image

Delete destination image

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

Example:

```json
{
  "imgId": "646e78243d3b7387243fc512"
}
```

Returns:

```json
{
  "deleted": true
}
```

**Technical Implementation**

1. Middlewares:
   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [checkPlaceOwnershipOnly](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkPlaceOwnership.js)
   - [Validation: deleteSchema](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/deleteImageSchema.js)
2. Service:
   - [deletePlaceImage](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/deletePlaceImage.js)
   - [deleteImages setting up](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/deleteImages.js)
   - [deleteImageFromCloudinary](https://github.com/flnx/wheredoigo/blob/main/server/src/services/cloudinaryService/delete/deleteImageFromCloudinary.js)

<br>

---

<br>

### PUT /places/:id/description

Edit place description

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

```json
{
  // Min 50 characters, Max 5000 characters (without the html tags, if any)
  "description": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>"
}
```

Returns:

```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```

**Technical Implementation**

1. Middlewares:

   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [checkPlaceOwnershipOnly](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkPlaceOwnership.js)
   - [Yup Validation: editPlaceDescriptionSchema](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/place/editPlaceDescriptionSchema.js)

2. Service:

   - [editPlaceDescription](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/editPlaceDescription.js)
   - [sanitizeHtmlString](https://github.com/flnx/wheredoigo/blob/main/server/src/utils/validators/sanitizeHtmlString.js)

<br>

---

<br>

### PUT /places/:id/type

Edit place type

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

```json
{
  // At least one of the allowed types: ["Explore", "Eat", "Fun"]
  "type": "Fun"
}
```

Returns:

```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```
**Technical Implementation**

1. Middlewares:

   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [checkPlaceOwnershipOnly](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkPlaceOwnership.js)
   - [Yup Validation: editPlaceTypeSchema](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/place/editPlaceTypeSchema.js)

2. Service:

   - [editPlaceType](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/editPlaceType.js)

<br>

---

<br>

### PUT /places/:id/name

Edit place name

**_Requires an access token provided in the "Authorization" header using the "Bearer" prefix (Refer to the "Authentication" section in the documentation for more details.)_**

```json
{
  // Between 1 and 60 characters
  "name": "Random Place Name"
}
```

Returns:

```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}
```
**Technical Implementation**

1. Middlewares:

   - [auth middleware](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/auth.js)
   - [checkPlaceOwnershipOnly](https://github.com/flnx/wheredoigo/blob/main/server/src/middlewares/checkPlaceOwnership.js)
   - [Yup Validation: editPlaceNameSchema](https://github.com/flnx/wheredoigo/blob/main/server/src/validators/place/editPlaceNameSchema.js)

2. Service:
    
   - [editPlaceName](https://github.com/flnx/wheredoigo/blob/main/server/src/services/placeServices/editPlaceName.js)

<br>

---

<br>