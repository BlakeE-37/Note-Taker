// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const uniqid = require('uniqid');

// retrieve db notes
const notes = require('./db/db.json');

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
    fs.readFile('./db/db.json').then((notes) => {
        console.log(JSON.parse(notes));
        res.json(JSON.parse(notes));
    })
})

// function to read file
function readAndReturn(newNote) {
    var dbArray;

    fs.readFile('./db/db.json').then(fileData => {
        // turn the read file into a json arrray
        dbArray = JSON.parse(fileData);
        // push the request object into the array
        dbArray.push(newNote);
        // turn the whole array back into a string
        dbArray = JSON.stringify(dbArray);
        console.log(dbArray, 'array');

        fs.writeFile('./db/db.json', dbArray, (err) => {
            err ? console.log(err) : console.log('Data written to db.json')
        });

    });
    // (error, fileData) => {
    // }

}

app.post('/api/notes', async (req, res) => {
    req.body.id = uniqid();
    await readAndReturn(req.body)
    res.end()

});

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})