# NodeJS/Express API for Where Do I Go

## IMPORTANT

### Request Headers

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

## User Resource

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
<br>

### DELETE /user/delete


```json



```