# Blog API

## Description
This is a **RESTful Blog API** built with **Node.js, Express, and MongoDB**.  
It allows users to **register, login, create blogs, and manage categories**. Each user can manage only their own blogs and categories.  

The API is structured with **three main routers**:

### User Router
- **Register**: Create a new user account  
- **Login**: Authenticate and receive a JWT token  
- **User management**: Secure endpoints using token authentication  

### Blog Router
- **Create Blog**: Add a new blog post  
- **Read Blogs**: Get all blogs by a user  
- **Update Blog**: Update a blog post (only owner can update)  
- **Delete Blog**: Delete a blog post (only owner can delete)  

### Category Router
- **Add Category**: Create a new category for blogs  
- **Get Categories**: Get all categories of a user  
- **Update Category**: Update a category (only owner)  
- **Delete Category**: Delete a category (only owner)  

## Features
- JWT-based authentication and authorization  
- Each user can manage only their own blogs and categories  
- CRUD operations for blogs and categories  
- Structured and modular code using routers  

## Technologies Used
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT for authentication  

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/bipinyadav01/Blog-api.git

2 Install dependencies:
  npm install
  
3 Setup MongoDB connection in app.js

4 Run the server:
  node server.js
