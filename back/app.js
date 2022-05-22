const express = require('express');
//const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
//const path = require('path');

//const dbc = require("./db");
//const db = dbc.getDB();

const app = express();



app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader ('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//app.use('/images', express.static(path.join(__dirname, 'images')))
//app.use('/api/posts', postsRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);


module.exports = app;