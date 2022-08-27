const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/helper');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

// DELETE Route for a new note
notes.delete('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const deleteNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndDelete(deleteNote, './db/db.json');
        res.json(`Note deleted successfully 🚀`);
    } else {
        res.error('Error in deleting note');
    }
});


module.exports = notes;