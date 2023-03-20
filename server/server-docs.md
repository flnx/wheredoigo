# NodeJS Server for Where Do I Go SPA App

## Server Packages:
- Express
- MongoDB
- dotenv
- cors
- bcrypt
- jsonwebtoken
- validator

# Register
* endpoint: /register
### method: POST

- Email: Valid and unique email address
- Password: At least 6 characters long
- Username: At least 2 characters long and must contain only letters and numbers

# Login
* endpoint: /login
### method: POST

- Valid Email & Password

# Destinations
* endpoint: /destinations

### method: GET
- returns max 9 destinations

* in order too get less than 9 results use limit
    - query: limit
    - example: destinations?limit=5
* in order to achieve pagination, use page query
    - query: page
    - example: /destinations?page=3
* to combine them: 
    - destinations?page=3&limit=4

### method: POST
 - send post request to /destinations with json {
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
    },
 }
 - If the country does not exist the server will create it and append its id to the destination
 - Countries and cities must contain only letters, single spaces or single dashes "-"
 - all fields are required except "details"
    - "Details" fields must be objects which have the following props: "category", "title", "description"
    - You can have as many objects as you want
- "imageUrls" is an array of strings. The strings must be valid urls.
- "Categories" are limited to: "goodToKnow", "transport", "localCustoms", "proTips", (might be updated)