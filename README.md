## Where Do I Go - Full Stack MERN App
## About

🌎✈️ An adventurous hub featuring an extensive collection of destinations and places, created by our community from around the world, that can be liked, commented and rated by users

⚒️ **Each user can create/edit/delete destinations and places, upload pictures and select suitable descriptions and details for their entries**
 - Users can create/edit/delete _destinations_ and _places_, upload/delete pictures and provide a detailed information
 - Each destination can contain many place, showcasing various attractions and landmarks
 - Each destination represents a real city within a specific country
 - Destination can be added in favorites (liked) by many users

🖼️ **Responsive Gallery**
 - Keyboard navigation
 - The gallery also features automatic scrolling while navigating through images
 - The images in the gallery are responsive and hosted on Cloudinary, ensuring optimal performance
 - For smaller screens, the images are processed to a lower resolution, ensuring a smooth and seamless user experience on various devices.

💬 Leave comments and rate places

📸 Furthermore, users can upload a personal photo or avatar to represent themselves

🏖️ **Personal Dashboard**
 - Upload/Change/Crop personal avatar/photo
 - User activities: comments, favorites, creations
 - Places rating chart data
 - Create destinations - select a country and city, add a description and additional details, upload photos, pick categories
 - Creator Destinations: allows the user to navigate trough their destinations - edit or delete them.
 - Favorite destinations list
 - Settings

🤖 Option for the creator to generate AI-driven comments and rating for each place based on its name and location

🔎 Guests can check out all the cool spots that users create by navigating to the 'Discover' page and search for specific destinations

👾 Client Data Caching which makes the user experience even better

👮🏻 Content Regulation by Moderators
 - Moderators are responsible for ensuring a safe and respectful environment for all users

### Main Technologies:

#### FrontEnd

- React
- React Query (Caching)
- Vitest + JEST, MSW
- chartJS, Yup, Swiper, Tiptap

#### BackEnd

- Express, MongoDB, Mongoose
- **Cloudinary** (Cloud based image management service)
- JSON Web Token, bcrypt, Express Rate Limit, Dom Purify, JSdom
- Yup, Validator, Multer

**AI Integration**

- OpenAI

### Project Screenshots & Implementation (May take a few seconds to load the GIFS)

#### Home page implementation
 - [Home](https://github.com/flnx/wheredoigo/tree/main/client/src/pages/Home)
 - [CitiesSlider](https://github.com/flnx/wheredoigo/tree/main/client/src/components/Sliders/CitiesSlider)

Home page - Desktop         |  Home page - Mobile
:-------------------------:|:-------------------------:
![](./screenshots/home%20desktop.gif)                   |  ![](./screenshots/home%20mobile.gif)

---

#### Destination details implementation
 - [DestinationDetails](https://github.com/flnx/wheredoigo/tree/main/client/src/pages/DestinationDetails)
 - [ImagesGridWrapper](https://github.com/flnx/wheredoigo/tree/main/client/src/components/ImagesGridWrapper)
 - [Gallery](https://github.com/flnx/wheredoigo/tree/main/client/src/components/Gallery)
 - [PlacesSlider](https://github.com/flnx/wheredoigo/tree/main/client/src/components/Sliders/PlacesSlider)

Destination Details - Desktop                           |  Destination Details - Mobile
:-------------------------:|:-------------------------:
![](./screenshots/dest%20details%20desktop.gif)         |  ![](./screenshots/dest%20details%20mobile.gif)

---

#### Place details implementation
 - [PlaceDetails](https://github.com/flnx/wheredoigo/tree/main/client/src/pages/PlaceDetails)
 - [ImagesGridWrapper](https://github.com/flnx/wheredoigo/tree/main/client/src/components/ImagesGridWrapper)
 - [Gallery](https://github.com/flnx/wheredoigo/tree/main/client/src/components/Gallery)

Place Details - Desktop                                 |  Place Details - Mobile
:-------------------------:|:-------------------------:
![](./screenshots/place%20details%20desktop.gif)        |  ![](./screenshots/place%20details%20mobile.gif)

---

#### Discover implementation
 - [Discover](https://github.com/flnx/wheredoigo/tree/main/client/src/pages/Discover)
 - [DestinationGrid](https://github.com/flnx/wheredoigo/tree/main/client/src/components/DestinationsGrid)
 - [SearchBar](https://github.com/flnx/wheredoigo/blob/main/client/src/components/Serach-Bar/SearchBar.jsx)
 - [CategoriesNav](https://github.com/flnx/wheredoigo/blob/main/client/src/components/CategoriesNav/CategoriesNav.jsx)
 - [ReactQuery Paginated Data Fetching](https://github.com/flnx/wheredoigo/blob/main/client/src/hooks/queries/useInfiniteDestinations.js)

Discover  - Desktop                                     |  Discover - Mobile
:-------------------------:|:-------------------------:
![](./screenshots/discover%20desktop.gif)               |  ![](./screenshots/discover%20mobile.gif)

---

#### Dashboard implementation
 - [Dashboard](https://github.com/flnx/wheredoigo/tree/main/client/src/pages/Dashboard)
    - [AddDestination](https://github.com/flnx/wheredoigo/tree/main/client/src/pages/Dashboard/sub-pages/AddDestination)
        - [ImageUploader](https://github.com/flnx/wheredoigo/tree/main/client/src/components/ImageUploader)
        - [ImageThumbsnailsPreview](https://github.com/flnx/wheredoigo/tree/main/client/src/components/ImageThumbnailsPreview)
        - [createFormData](https://github.com/flnx/wheredoigo/blob/main/client/src/utils/formData.js)
        - [handleImageFiles](https://github.com/flnx/wheredoigo/blob/main/client/src/utils/imagesHandler.js)
        - [validateData](https://github.com/flnx/wheredoigo/blob/main/client/src/utils/validationSchemas/destinationSchemas.js)
    - [Favorites](https://github.com/flnx/wheredoigo/blob/main/client/src/pages/Dashboard/sub-pages/Favorites/Favorites.jsx)
    - [Dashboard Main](https://github.com/flnx/wheredoigo/tree/main/client/src/pages/Dashboard/sub-pages/Main)
    - [OwnerDestinations](https://github.com/flnx/wheredoigo/tree/main/client/src/pages/Dashboard/sub-pages/OwnerDestinations)
    - [UserSettings](https://github.com/flnx/wheredoigo/tree/main/client/src/pages/Dashboard/sub-pages/UserSettings)

Dashboard  - Desktop                                    |  Dashboard - Mobile
:-------------------------:|:-------------------------:
![](./screenshots/dashboard%20desktop.gif)              |  ![](./screenshots/dashboard%20mobile.gif)

---

Edit Destination & Place- Desktop                       |  Edit Destination & Place - Mobile
:-------------------------:|:-------------------------:
![](./screenshots/edit%20desktop.gif)                   |  ![](./screenshots/edit%20mobile.gif)

Change Avatar Desktop                                   |  Change Avatar - Mobile
:-------------------------:|:-------------------------:
![](./screenshots/avatar%20desktop.gif)                 |  ![](./screenshots/avatar%20mobile.gif)

Navbar Dropdown Desktop                                 |  Navbar Dropdown Mobile  
:-------------------------:|:-------------------------:
![](./screenshots/nav%20dropdown%20desktop.gif)         |  ![](./screenshots/nav%20dropdown%20mobile.gif)

Create Destination Desktop                              |  Create Destination Mobile  
:-------------------------:|:-------------------------:
![](./screenshots/create%20destination%20desktop.gif)   |  ![](./screenshots/create%20destination%20mobile.gif)

Create Place Desktop                                    |  Create Place Mobile  
:-------------------------:|:-------------------------:
![](./screenshots/add%20place%20desktop.gif)            |  ![](./screenshots/add%20place%20mobile.gif)

Gallery Desktop                                         |  Gallery Mobile  
:-------------------------:|:-------------------------:
![](./screenshots/gallery%20desktop.gif)                |  ![](./screenshots/gallery%20mobile.gif)

Register Desktop                                        |  Register Mobile  
:-------------------------:|:-------------------------:
![](./screenshots/register%20desktop.gif)               |  ![](./screenshots/register%20mobile.gif)

Login Desktop                                           |  Login Mobile  
:-------------------------:|:-------------------------:
![](./screenshots/login%20desktop.gif)                  |  ![](./screenshots/login%20mobile.gif)