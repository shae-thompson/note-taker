const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for saving notes
notes.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuid(),
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

  notes.delete("/:id", (req, res) => {
    const id = req.params.id;
    if (id) {
        readAndDelete(id, "./db/db.json");
        res.json("Note deleted.");
    } else {
        res.json("Error ocuured while deleting note.");
    }
});

  module.exports = notes;