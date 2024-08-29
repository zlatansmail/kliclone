# Klix Clone

## Brief Description

Klix Clone is a web application developed as an exercise in MERN (MongoDB, Express, React, Node.js) stack development. It replicates the functionality and design of the popular news website klix.ba. This project aims to provide a hands-on experience with full-stack development, including front-end and back-end integration, state management, and API handling.

## Installation Instructions

To get started with the Klix Clone project, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud instance)

### Clone the Repository

```sh
git clone https://github.com/yourusername/klix-clone.git
cd klix-clone
```

### Backend Setup

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the backend directory and add the following environment variables:
    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```sh
    npm run dev
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the frontend directory and add the following environment variable:
    ```env
    REACT_APP_API_URL=http://localhost:5000
    ```

4. Start the frontend development server:
    ```sh
    npm start
    ```

## Usage Instructions

Once both the backend and frontend servers are running, you can access the application at `http://localhost:3000`. The following routes are available:

- `/` - Homepage
- `/clanak/:slug` - Article Page
- `/register` - Register Page
- `/login` - Login Page
- `/profile` - Profile Page
- `/dashboard` - Admin Dashboard

## API Endpoints

The backend API provides the following endpoints:

### User Routes

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Post Routes

- `GET /api/posts` - Get all posts
- `GET /api/posts/:slug` - Get a single post by slug
- `POST /api/posts` - Create a new post (Admin only)
- `PUT /api/posts/:id` - Update a post (Admin only)
- `DELETE /api/posts/:id` - Delete a post (Admin only)

### Comment Routes

- `GET /api/comments` - Get all comments
- `POST /api/comments` - Create a new comment
- `DELETE /api/comments/:id` - Delete a comment (Admin only)

### Category Routes

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category (Admin only)
- `DELETE /api/categories/:id` - Delete a category (Admin only)

## Additional Features

- **Admin Dashboard**: Manage posts, comments, and categories.
- **User Authentication**: Register and login functionality with JWT-based authentication.
- **Responsive Design**: The application is fully responsive and works on all device sizes.
- **Real-time Updates**: Uses React Query for data fetching and state management, providing real-time updates to the UI.

## Technologies and Frameworks Used

- **Frontend**: React, React Router, React Query, Redux, React Hot Toast
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Multer
- **Styling**: CSS, CSS Modules
- **Other Tools**: Nodemon, dotenv, cors
