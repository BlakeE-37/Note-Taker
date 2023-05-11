// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// retrieve db notes
const notes = require('./db/db.json')

// start the express app
const app = express();
const PORT = 3001;

//middlewares
app.use(express.static('public'));
app.use(express.json())

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

app.post('/api/notes', (req, res) => {
    console.log(req.body)
    let { title, text } = req.body;
    data = JSON.stringify(req.body)

    fs.appendFile('./db/db.json', data, (err) => {
        err ? console.log(err) : console.log('Data written to db.json')
    })
})

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})