const path = require('path');
const transfer = require('./Controllers/Transfer.js');
const person = require('./Controllers/Person.js');

module.exports = (app) => {

    app.post("/transfer", transfer.upload);
    app.get("/transfers", transfer.query);
    app.get("/persons", person);
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
}