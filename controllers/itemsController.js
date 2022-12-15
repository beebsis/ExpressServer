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

// Get all item through our routes check routes dir
const getAllItems = async (req, res) => {
    const items = await Item.find();
    if (!items) return res.status(204).json({ 'message': 'No items found.' });
    res.json(items);
}

// Updates an Item based on our routes in routes dir
const updateItem = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const item = await Item.findOne({ _id: req.body.id }).exec();
    if (!item) {
        return res.status(204).json({ "message": `No item matches ID ${req.body.id}.` });
    }

    if (req.body?.fabri) item.fabri = req.body.fabri;
    /*
        if (req.body?.model) item.model = req.body.model;
        if (req.body?.typer) item.typer = req.body.typer;
        if (req.body?.serial) item.serial = req.body.serial;
        if (req.body?.status) item.status = req.body.status;
    */

    const result = await item.save();
    res.json(result);
}

const deleteItem = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Item ID required.' });

    const item = await Item.findOne({ _id: req.body.id }).exec();
    if (!item) {
        return res.status(204).json({ "message": `No item matches ID ${req.body.id}.` });
    }
    const result = await item.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

// Spy on an item through our routes in routes dir
const getItem = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Item ID required.' });

    const item = await Item.findOne({ _id: req.params.id }).exec();
    if (!item) {
        return res.status(204).json({ "message": `No item matches ID ${req.params.id}.` });
    }
    res.json(item);
}

module.exports = { handleNewItem, updateItem, getAllItems, deleteItem, getItem };