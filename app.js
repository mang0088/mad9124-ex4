'use strict';

const morgan = require('morgan');
const express = require('express');
const carsRouter = require('./routes/carsRouter');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/cars', carsRouter);

const port = process.env.port || 3030;
app.listen(port, () => console.log(`Server listening on port ${port} ...`));
