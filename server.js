const dotenv = require('dotenv');
const http = require('http');
const colors = require('colors');
const path = require('path');


dotenv.config({ path: './config/config.env' });

const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server is listening on ${PORT}...`.yellow));