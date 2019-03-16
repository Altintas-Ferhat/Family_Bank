const Transfer = require('../Models/Transfer.js');

exports.upload = (req, res) => {
    
    let datas = req.body;

    let transfer = new Transfer({
        sender: datas.sender,
        receiver: datas.receiver,
        amount: datas.amount,
        date: datas.date,
        details: datas.details
    });

    transfer.save((error) => {
        if(error) {
            throw error;
        }

        res.send("Transfer was added.");
    });
};

exports.query = (req, res) => {
    
    Transfer.find({}, function(error, transfers) {

        if(error) {
            throw error;
        }

        res.json(transfers);
    });
};