const persons = require("../Persons.json");

module.exports = (req, res) => {
    res.send(persons);
};