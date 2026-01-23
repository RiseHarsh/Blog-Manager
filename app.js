const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const blogs = require('./models/blogs');
const User = require('./models/user')
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.set('layout', 'layouts/boilerplate');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/blog_manager');
}
main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// Middleware to make user available in all views
app.use((req, res, next) => {
    if (req.session.userId) {
        res.locals.user = {
            id: req.session.userId,
            name: req.session.userName
        };
    } else {
        res.locals.user = null;
    }
    next();
});



// Defining a function to fetch blogs and render main page
async function renderBlogList(req, res) {
    try {
        const blog = await blogs.find();
        res.render('main.ejs', { blog });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

// Using the same function for both routes
app.get('/', renderBlogList);
app.get('/blogs', renderBlogList);


app.get('/blogs/views/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let indblog = await blogs.findById(id)
        if (!indblog) {
            return res.status(404).send('Blog not found');
        }
        res.render("views.ejs", { indblog });
    } catch (e) {
        console.error('Error fetching blog:', e);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/blogs/:id/increment-views', async (req, res) => {
    try {
        const { id } = req.params;

        // Increment the views field by 1
        const updatedBlog = await blogs.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Send back the updated views count
        res.json({ views: updatedBlog.views });
    } catch (error) {
        console.error('Error incrementing views:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//login page
app.post('/auth/signup', async (req,res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.render('login', { 
                error: 'All fields are required', 
                activeTab: 'signup' 
            });
        }

        if (password !== confirmPassword) {
            return res.render('login', { 
                error: 'Passwords do not match', 
                activeTab: 'signup' 
            });
        }

        const exists = await User.findOne({ email });
        if (exists) return res.render('login', { 
            error: 'User already exists', 
            activeTab: 'signup' 
        });

        const user = new User({ name, email, password });
        await user.save();

        // Auto-login
        req.session.userId = user._id;
        req.session.userName = user.name;

        res.redirect('/'); // redirect after successful signup
    } catch (err) {
        console.error(err);
        res.status(500).render('login', { 
            error: 'Server error occurred', 
            activeTab: 'signup' 
        });
    }
});
  

// Login
app.get('/login', (req,res) =>{
    res.render("login.ejs")
});

app.post('/auth/login', async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { error: 'User not found' });
        }

        const match = await user.comparePassword(password);
        if (!match) {
            return res.render('login', { error: 'Incorrect password' });
        }

        // ✅ Create session
        req.session.userId = user._id;
        req.session.userName = user.name;

        res.redirect('/');
    } catch(err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        res.redirect('/');
    });
});



//404 route
app.use((req, res) => {
    res.send('404 Page Not Found');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});