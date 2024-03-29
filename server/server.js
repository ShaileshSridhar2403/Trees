import appModulePath from 'app-module-path';
import http from 'http';

const cors = require('cors');
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');

appModulePath.addPath(`${__dirname}`);

// create express app
const app = express();
const HTTP = http.Server(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(cors());
app.use(express.static(path.join(__dirname + '/../build')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirnam + '/../build/index.html'))
})
app.get('/editorapp', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'))
})

// define a simple route
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
// });

require('./app/routes/note.routes.js')(app);

const port = process.env.PORT || 8000;
// listen for requests
HTTP.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});