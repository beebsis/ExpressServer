//const { model } = require('mongoose');
const Item = require('../model/Item');

const handleNewItem = async (req, res) => {
    const  { fabri, modelSerie, specType, vareSerial } = req.body;
    if ( !fabri || !modelSerie || !specType || !vareSerial ) return res.status(400).json({ 'message': "Fabrikant, Model serie, type of serial er krævet"});

    const duplicate = await Item.findOne({ serial: vareSerial}).exec();

    if ( duplicate ) return res.sendStatus(409);

    try {
        const result = await Item.create({
            "fabrikant": fabri,
            "model": modelSerie,
            "typer": specType,
            "serial": vareSerial
        });
        console.log(result);
        res.status(201).json({ 'success': `New item ${fabri} has been added!` });

    }   catch (err) {
        res.status(500).json({ 'message': err.message })
    }

}

const getAllItems = async (req, res) => {
    Item.find({}, function (err, items) {
        if(err){
            res.send('something went wrong!');
            next();
        }
        res.json(items);
    });
};

const getItem = async (req, res) => {
    if (!req?.params?.id) return res.status(4000).json({ 'message': 'Gestand ID nødvendigt.'});
    const item = await Item.findOne({ _id: req.params.id}).exec();
    if (!item) {
        return res.status(204).json({ "message": `Ingen genstand matcher det angivet ID nummer ${req.params.id}.`});
    }
    res.json(item);
};

module.exports = {
    handleNewItem,
    getAllItems,
    getItem
};