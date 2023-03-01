const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for saving notes
notes.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, message } = req.body;
  
    // If all the required properties are present
    if (title && message) {
      // Variable for the object we will save
      const newNote = {
        title,
        message,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
  });