const express = require('express');
const cors = require('cors');
const db = require('./app/models');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();

var corsOptions = {
    origin: ['*', 'http://localhost:8080', 'http://localhost:8000', 'http://localhost:3000', 'https://www.last-jedi.com', 'https://ape-s.vercel.app'],
    credentials: true,
    optionSuccessStatus: 200,
};


mongoose
    .connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected DB!');
    })
    .catch(err => {
        console.log('Cannot connect DB', err);
        process.exit();
    });
    
    app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.use('/images', express.static('images'));


// simple route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the server.'
    });
}
);

require('./app/routes/banner.routes')(app);
require('./app/routes/sale.routes')(app);
require('./app/routes/airdrop.routes')(app);
require('./app/routes/lock.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
}
);
