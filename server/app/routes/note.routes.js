module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const links = require('../controllers/links.controller.js');
    const cid = require('../controllers/cid.controller.js')

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

    // Get Links
    app.get('/links', links.findAll);

    // // Update Links
    // app.put('/links', links.update);

    // Save Links
    app.post('/links', links.create);

    // Get Current ID
    app.get('/cid', cid.findOne);

    // Save Current ID
    app.put('/cid', cid.update);

    //With api prefix(for 'build')

      // Create a new Note
      app.post('/api/notes', notes.create);

      // Retrieve all Notes
      app.get('/api/notes', notes.findAll);
  
      // Retrieve a single Note with noteId
      app.get('/api/notes/:noteId', notes.findOne);
  
      // Update a Note with noteId
      app.put('/api/notes/:noteId', notes.update);
  
      // Delete a Note with noteId
      app.delete('/api/notes/:noteId', notes.delete);
  
      // Add Child Note for the parent with id = noteId
      app.get('/api/notes/addChild/:noteId', notes.addChild);
  
      // Add Sibling Note for the note with id = noteId
      app.get('/api/notes/addSibling/:noteId', notes.addSibling);
  
      // Get Links
      app.get('/api/links', links.findAll);
  
      // // Update Links
      // app.put('/api/links', links.update);
  
      // Save Links
      app.post('/api/links', links.create);
}