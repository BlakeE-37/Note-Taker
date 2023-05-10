// Dependencies
const express = require('express');
const path = require('path')

// retrieve db notes
const notes = require('./db/db.json')

// start the express app
const app = express();
const PORT = 3001;

app.use(express.static('public'));

// get request for the basic homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// get request for the notes page
app.get('/notes', (req, res) => { res.sendFile(path.join(__dirname, 'public/notes.html')) })

// retrieves api notes from db
app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})