# Pinterest Clone

This is a simple Pinterest-like application built using Node.js, Express, MongoDB, and Passport.js for authentication.

## Features
- User authentication (registration & login) using Passport.js
- User profiles with image uploads
- Ability to create and view posts with images
- Feed page to see all posts
- Middleware to protect routes

## Installation

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/Pinterest.git
   cd Pinterest
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the MongoDB server:
   ```sh
   mongod
   ```
4. Run the application:
   ```sh
   npm start
   ```

## Folder Structure
```
Pinterest/
│-- models/
│   ├── user.js
│   ├── post.js
│-- routes/
│   ├── index.js
│-- views/
│   ├── index.ejs
│   ├── register.ejs
│   ├── profile.ejs
│   ├── feed.ejs
│   ├── add.ejs
│-- public/
│   ├── uploads/
│-- app.js
│-- package.json
│-- README.md
```

## API Routes

### GET Routes
| Route         | Description |
|--------------|-------------|
| `/` | Home page |
| `/register` | Register new user |
| `/profile` | View user profile |
| `/feed` | View posts from all users |
| `/show/posts` | Show posts of logged-in user |
| `/add` | Page to add new post |
| `/profile/logout` | Log out user |

### POST Routes
| Route | Description |
|--------------|-------------|
| `/register` | Register a new user |
| `/` | Authenticate user login |
| `/createpost` | Create a new post |
| `/fileupload` | Upload a profile image |

## Dependencies
- Express
- Mongoose
- Passport.js
- Multer
- EJS

## License
This project is open-source and available under the MIT License.

