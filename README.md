# 📝 **Blog Manager**

A simple, full-stack blogging app where you can **write, edit, delete, and explore blogs**.  
Built as a **learning and portfolio project** using **Node.js, Express, MongoDB, and EJS**.  

---

## ✨ Features

### 👤 Users
- Sign up and log in securely
- Sessions stored safely in MongoDB
- Protected routes: only logged-in users can create, edit, or delete blogs

### ✍️ Blogs
- Create new blogs with title, content, and tags
- Edit or delete **your own blogs**
- Only authors can modify their content

### ❤️ Interaction
- Like and unlike blogs
- View counts automatically update
- See blogs you’ve liked in one place

### 📂 Dashboard
- **My Blogs** page shows:
  - Blogs you created
  - Blogs you liked
- Clean card-based UI for easy browsing

### 🎯 UX Improvements
- Smart **“Get Started”** button (redirects depending on login status)
- Confirmation before deleting blogs
- Modern, simple, readable design

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **EJS** templating
- **Vanilla JavaScript** (Fetch API)
- **express-session + connect-mongo** for authentication
  
---
## 📁 Project Structure
blog-manager/

├── models/ # Mongoose models for users & blogs

├── views/ # EJS templates

├── public/ # CSS, JS, images

├── app.js # Main server file

├── package.json

└── README.md

1️⃣ **Clone the repository**

git clone https://github.com/your-username/blog-manager.git

cd blog-manager


2️⃣ Install dependencies

npm install


3️⃣ Add environment variables

Create a .env file in the root directory:

SESSION_SECRET=your_secret_key


4️⃣ Start MongoDB

Make sure MongoDB is running locally:

mongod


5️⃣ Run the app

npm run dev

Open in your browser:

http://localhost:8080


## 🔐 License

This project is licensed under the MIT License — feel free to explore, learn, or adapt it for your own projects.
See the LICENSE file for details.

🤝 Future Improvements
Comments system for blogs
Categories and search
Rich text editor for blog content
User profile pages
Pagination and infinite scroll
Deployment on cloud platforms (Render, Vercel, Railway)

🌟 Author Notes
This project is designed to showcase practical full-stack skills, clean UI, and solid backend logic.

---


