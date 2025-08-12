🎬 Movie Recommendation Backend API
A RESTful backend service for managing movies, user authentication, awards, news articles, reviews, and personalized watchlists.

Built with Node.js, Express, and MongoDB.

Features

1. Authentication
-User registration & login (JWT-based authentication).
-Secure password hashing.

2. Movies
-Add, update, delete, and fetch movie records.
-Retrieve upcoming movies and recommendations by genre.

3. Awards
-Create, update, delete, and view awards.

4. News
-Publish, edit, and fetch news articles.

5. Reviews
-Add and delete reviews.
-View reviews by user or by movie.

6. Watchlists
-Create, update, and delete watchlists.
-Add or remove movies from watchlists.

🛠 Tech Stack
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Auth & Security: JWT, bcrypt
API Testing: Postman

📦 Installation & Setup

1. Clone the repository
-git clone [<repository-url>](https://github.com/Ibrahim8781/Movie-Recommendation-Backend)
-cd project-folder
2. Install dependencies
-npm install
3. Configure environment variables
-Create a .env file in the project root and add:
JWT_SECRET=your_secret_key_here
4. Run the server
npm run dev
Server runs by default on http://localhost:5000.

📑 API Documentation
You can explore the API via the included Postman collection:
Postman Documentation Link: https://elements.getpostman.com/redirect?entityId=34836347-7454486d-d8bf-4fb1-8f14-ea6b4b129801&entityType=collection

📌 Example Use Case
Register a new user.
Login to get your JWT token.
Use the token to:
Add a movie.
Create a watchlist and add the movie to it.
Leave a review for the movie.
