const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const blogs = require('./models/blogs');
const expressLayouts = require('express-ejs-layouts');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(expressLayouts);
app.set('layout', 'layouts/boilerplate');

async function main(){
    await mongoose.connect('mongodb://localhost:27017/blog_manager');
}
main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.get('/blogs/views/:id', async (req,res) => {
    try{
        const {id} = req.params;
        let indblog = await blogs.findById(id);
        res.render("views.ejs",{indblog});
    }catch(e){
        console.error('Error fetching blog:', e);
    res.status(500).send('Internal Server Error');
    }
})

app.get('/',async (req, res) => {
    let blog = await blogs.find();
    res.render('main.ejs', { blog });
});

//404 route
app.use((req,res)=>{
    res.send('404 Page Not Found');
  });
  
  app.listen(8080, () => {
    console.log('Server is running on port 8080');
  });