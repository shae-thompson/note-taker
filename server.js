// Require express & API route
const express = require('express');
const api = require('./routes/index.js');

// Sets 3001 as the listening port
const PORT = process.env.PORT || 3001;

// Creates express application
const app = express();

// Uses the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api)

// Host public folder
app.use(express.static('public'));

// GET Route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// GET Route for homepage 
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});