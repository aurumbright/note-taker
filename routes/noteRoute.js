const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/helper');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

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
notes.delete('/:id', (req, res) => {

    let noteList = require('../db/db.json');

    for (let i = 0; i < noteList.length; i++) {

        if (req.params.id === noteList[i].id) {
            noteList.splice(i, 1);
        }
    }

    fs.writeFile("./db/db.json", JSON.stringify(noteList), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("Your note was deleted!");
        }
    });
    res.json(noteList);
});

module.exports = notes;