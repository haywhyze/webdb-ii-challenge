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

module.exports = server;