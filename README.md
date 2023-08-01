## Where Do I Go - Full Stack MERN App

## About

🌎✈️ An adventurous hub featuring an extensive collection of destinations and places, created by our community from around the world, that can be liked, commented and rated by users.

⚒️ Each user can create/edit/delete destinations and places, upload pictures and select suitable descriptions and details for their entries

🖼️ Responsive Gallery

💬 Leave comments and rate places.

📸 Furthermore, users can upload a personal photo or avatar to represent themselves

🏖️ Personal Dashboard

🤖 Option to generate AI-driven comments for each place based on its name and location

🔎 Guests can check out all the cool spots that users create by navigating to the 'Discover' page

👾 Client Data Caching which makes the user experience even better

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

<br>

---

<br>

### Key Features:

#### Gallery

- Keyboard navigation
- The gallery also features automatic scrolling while navigating through images
- The images in the gallery are responsive and hosted on Cloudinary, ensuring optimal performance
- For smaller screens, the images are processed to a lower resolution, ensuring a smooth and seamless user experience on various devices.

#### Destinations

- Users can create destinations, upload pictures and provide a detailed information about it
- Each destination represents a real city within a specific country
- Destination can be added in favorites (liked) by many users
- Destinations can be categorized under multiple categories: “Beach”, “Mountains”, “Cultural”, “Snow”, “Islands”, and “Adventure”
- Each destination can contain many place, showcasing various attractions and landmarks
- The creator can edit their destinations content such as: _description_, _details_, _upload/remove pictures_

#### Places

- Users can create places, upload pictures, include a description, provide details, and choose a place category/type
- Each place can be linked to a single destination
- Each place can be commented on and rated by other users
- The place creator can add AI-generated comments with ratings specific to that place, based on place’s name and location
- Places are categorized into three main types: 'Explore,' 'Eat,' or 'Fun,'
- The creator can edit their places content such as: _description_, _details_, _upload/remove pictures_

#### Dashboard

- **Upload/Change/Crop** user personal avatar/photo
- **User activities:** comments, favorites, creations
- **Places rating** **chart** data
- **Add destination** - select a country and city, add a description and additional details, upload photos, pick categories
- **Creator Destinations:** allows the user to navigate trough their destinations - edit or delete them.
- **Favorite destinations list**
- **Settings**

#### Search (Discover)

- Discover page provides the ability to **search** for a destination based on its city / country or category that falls into

#### Content Regulation by Moderators

- Moderators are responsible for ensuring a safe and respectful environment for all users
- If any content is found to be inappropriate or in violation of the platform's policies, moderators can take necessary actions, such as editing, hiding, or removing the content

![](../../../Documents/Desktop%202023.08.02%20-%2000.23.03.02.mp4)