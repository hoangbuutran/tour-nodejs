const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');

const userRouter = require('./routes/user.route');
const durationRouter = require('./routes/duration.route');
const headerTopRouter = require('./routes/headerTop.route');


// Swagger-UI
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Tour API for JSONPlaceholder',
        version: '1.0.0',
        description:
            'This is a REST API application made with Tour. It retrieves data from JSONPlaceholder.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
        {
            url: 'https://api.thienduongmientrung.vn',
            description: 'Production server',
        },
    ],
};


// Init express
const app = express();


// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 3332);

app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/durations`, durationRouter);
app.use(`/api/v1/header-top`, headerTopRouter)


// Swagger-UI
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: [
        './routes/*.js',
        './routes/user.route',
        './routes/user.route.js',
    ],
};
const swaggerSpec = swaggerJSDoc(options);

app.get('/api-docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true })
    );

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
app.get('/', (req, res, next) => {
    res.send('hiiiiiiiii')
});

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});


// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;
