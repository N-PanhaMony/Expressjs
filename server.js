// server.js
const express = require('express');
const path = require('path')
const posts = require('./routes/posts')
const app = express();

//setup static folder
app.use(express.static(path.join(__dirname, 'public')))

//body parser middleware
app.use(express.json()) // this for raws in body
app.use(express.urlencoded({extended : false})) // this for urlencoded in body

app.use('/api/posts',posts)

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

