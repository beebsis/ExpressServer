//express
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
// const { allowedNodeEnvironmentFlags } = require('process');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

//  Custom logger middleware
app.use(logger);

// Checking credentials before CORS!
// and fetch cookies credentials requirements
app.use(credentials);

//  CORS APPLIANCE
app.use(cors(corsOptions));

//  Built-in middleware to handle url-encoded data
//  in other words, "form data handling":
//  `content-type: applciation/x-www-form-urlencoded`
//  Applies to all routes since "use" is at the top.
app.use(express.urlencoded({extended: false}));

//  Built-in middleware for handling JSON
app.use(express.json());

// Midldeware for cookies
app.use(cookieParser());

// Built-in middleware for static files
app.use('/', express.static(path.join(__dirname, '/public')));

//  Routes from route dirs
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

//  Verify routes
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

// Grabbing non-sites
app.all('/*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ err: "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found");
    }
});

//  Error logger
app.use(errorHandler);

// Check if connected, if not connected don't listen to requests.
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT} . visit localhost:${PORT}/`));
})