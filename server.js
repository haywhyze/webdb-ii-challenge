const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use(express.urlencoded({ extended: true }))

server.get('/api/cars', async (req, res) => {
  try {
    const cars = await db('cars');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get cars' });
  }
});

server.post('/api/cars', async (req, res) => {
  const { vin, make, mileage, model, status, transmission_type } = req.body;

  if (!vin || !make || !mileage || !model) {
    res.status(400).json({ errorMessage: 'one or more of the required field is not provided' });
  }
  else {
    try {
      const [newCarId] = await db('cars').insert({ 
        vin, 
        make, 
        mileage, 
        model, 
        status, 
        transmission_type 
        });
      if (newCarId) {
        const newCar = await db('cars').where({ id: newCarId });
        res.json(newCar);
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Failed to create account' });
    }
  }
})

module.exports = server;