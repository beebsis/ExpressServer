//const { model } = require('mongoose');
const Item = require('../model/Item');

const handleNewItem = async (req, res) => {
    const { mfr, modelSerie, type, serial } = req.body;
    if (!mfr || !modelSerie || !type || !serial) return res.status(400).json({ 'message': 'Manufacturer, Model series, type and serial are required.'})
    
    const duplicate = await Item.findOne({ manufacturer: mfr}).exec();
    if (duplicate) return res.sendStatus(409);

    try {
        const result = await Item.create({
            "manufacturer": mfr,
            "model": modelSerie,
            "type": type,
            "serial": serial
        });
        console.log(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ 'message': err.message})
    }
}

module.exports = { handleNewItem };