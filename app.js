const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const translateRoutes = require('./routes/translate');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//enable CORS
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, '_public')));

app.use('/', translateRoutes);

//error handler
app.use((req,res,next) => {
    const error = new Error('Not Found!');
    error.status = 400;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
        }
    })
});

module.exports = app;