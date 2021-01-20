module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);

    // Add Child Note for the parent with id = noteId
    app.get('/notes/addChild/:noteId', notes.addChild);

    // Add Sibling Note for the note with id = noteId
    app.get('/notes/addSibling/:noteId', notes.addSibling);

    // Get Tree Data
    app.get('/note/getTreeData/', notes.getTreeData);
}