const express = require('express');
const { cars } = require('../data/cars');
const validateCarId = require('../middleware/validateCarId');
const router = express.Router();

router.use('/:carID', validateCarId);

router.get('/', (req, res) => {
  res.json({ data: cars.map((car) => formatResponseData('cars', car)) });
});

router.get('/:carId', (req, res) => {
  res.json({ data: formatResponseData('cars', cars[req.carIndex]) });
});

router.post('/', (req, res) => {
  const { make, model, colour } = req.body;
  const newCar = {
    id: Date.now(),
    make: make,
    model: model,
    colour: colour,
  };
  cars.push(newCar);
  res.status(201).json({ data: formatResponseData('cars', newCar) });
});

router.put('/:carId', (req, res) => {
  const { make, model, colour } = req.body;
  const updatedCar = { id: parseInt(req.params.carId), make, model, colour };
  cars[req.carIndex] = updatedCar;
  res.json({ data: formatResponseData('cars', updatedCar) });
});

router.patch('/:carId', (req, res) => {
  const { id, ...theRest } = req.body;
  const updatedCar = Object.assign({}, cars[req.carIndex], theRest);
  cars[req.carIndex] = updatedCar;
  res.json({ data: formatResponseData('cars', updatedCar) });
});

router.delete('/:carId', (req, res) => {
  const deletedCar = cars[req.carIndex];
  cars.splice(req.carIndex, 1);
  res.json({ data: formatResponseData('cars', deletedCar) });
});

/**
 * Format the response data object according to JSON:API v1.0
 * @param {string} type The resource collection name, e.g. 'cars'
 * @param {Object} resource An instance object from that collection
 * @returns
 */

function formatResponseData(type, resource) {
  const { id, ...attributes } = resource;
  return { type, id, attributes };
}

module.exports = router;
