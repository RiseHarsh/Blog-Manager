📝 Blog Manager

A simple, full-stack blogging app where people can write, edit, delete, and explore blogs.
Built as a learning + portfolio project using Node.js, Express, MongoDB, and EJS.

The idea was to keep things clean and practical — no overengineering, just real features you’d expect in a blogging platform.

✨ What this app can do
👤 Users

Sign up and log in

Sessions are stored securely in MongoDB

Protected routes (only logged-in users can create/edit/delete)

✍️ Blogs

Create new blogs

Edit or delete your own blogs

Add tags to blogs

Only the author can modify their content

❤️ Interaction

Like and unlike blogs

View counts increase when a blog is opened

See blogs you’ve liked in one place

📂 Dashboard

My Blogs page shows:

Blogs you created

Blogs you liked

Clean card-based UI for easy browsing

🎯 Small UX touches

Smart “Get Started” button (changes behavior if logged in)

Confirmation before deleting blogs

Simple, readable design

🛠️ Tech used

Node.js

Express

MongoDB + Mongoose

EJS

Vanilla JS (Fetch API)

express-session + connect-mongo

Nothing fancy — just solid fundamentals.

📁 Project structure (simplified)
blog-manager/
├── models/
├── views/
├── public/
├── app.js
├── package.json
└── README.md

⚙️ Running the project locally
1. Clone the repo
git clone https://github.com/your-username/blog-manager.git
cd blog-manager

2. Install dependencies
npm install

3. Add environment variables

Create a .env file:

SESSION_SECRET=your_secret_key

4. Start MongoDB

Make sure MongoDB is running locally.

5. Run the app
npm run dev


Open:

http://localhost:8080