const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();

// Get route for recieving notes
app.get('/notes', (req, res) =>
  readFromFile('./db/db.json'), (err, data) => {
    if (err) throw err;
  res.json(JSON.parse(data));
  });