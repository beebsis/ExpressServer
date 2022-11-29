//express
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const { allowedNodeEnvironmentFlags } = require('process');
const PORT = process.env.PORT || 3500;

//  Custom logger middleware
app.use(logger);

//  CORS APPLIANCE
app.use(cors(corsOptions));

//  Built-in middleware to handle url-encoded data
//  in other words, "form data handling":
//  `content-type: applciation/x-www-form-urlencoded`
//  Applies to all routes since "use" is at the top.
app.use(express.urlencoded({extended: false}));

//  Built-in middleware for handling JSON
app.use(express.json());

// Built-in middleware for static files
app.use('/', express.static(path.join(__dirname, '/public')));

//Routes from route dir & subdir
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
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

app.listen(PORT, () => console.log(`Server running on port ${PORT} . visit localhost${PORT}/`));