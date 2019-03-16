const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

const path = require('path');

const mongoose = require('mongoose');

const router = require('./Router.js');

const port = 4000;

mongoose.connect("mongodb://192.168.0.106:27017/main")
    .then(() => console.log("Connected to the database."))
    .catch(error => console.log(`Connection failed: ${error} .`));


app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(__dirname, "../build")));

router(app);

app.listen(port, () => console.log(`App is listening on port: ${port}`));

