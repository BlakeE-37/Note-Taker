// Dependencies
const express = require('express');

// start the express app
const app = express();
const PORT = 3001;

app.use(express.static('public'))

app.get('/', (req, res) => { res.sendFile('index.html') })


app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})