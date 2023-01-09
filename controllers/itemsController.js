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
            "type": specType,
            "serial": vareSerial
        });
        console.log(result);
        res.status(201).json({ 'success': `New item ${fabri} has been added!` });

    }   catch (err) {
        res.status(500).json({ 'message': err.message })
    }

}

module.exports = { handleNewItem};