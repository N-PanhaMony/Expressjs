// server.js
const express = require('express');
const path = require('path')
const posts = require('./routes/posts')
const logger = require('./middleware/logger')
const app = express();

//setup static folder
app.use(express.static(path.join(__dirname, 'public')))

//body parser middleware
app.use(express.json()); // for JSON bodies
app.use(express.urlencoded({ extended: false })); // for form-urlencoded

//middleware color packer
app.use(logger)

app.use('/api/posts',posts)

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

