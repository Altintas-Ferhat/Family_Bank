const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//Define model

const transferSchema = new Schema({

    sender: String,

    receiver: String,

    amount: Number,

    date: String,

    details: String

});

//Create the model class

const Model = mongoose.model('Transfer', transferSchema);


//Export the model

module.exports = Model;