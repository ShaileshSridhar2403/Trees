// const Note = require('../models/note.model.js');

var PouchDB = require('pouchdb');
var notesDb = new PouchDB('notesDb');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note and Save Note in the database
    notesDb.post({
        title: req.body.title || "Untitled Note", 
        content: req.body.content,
        parent: "",
        children: []
    })
    .then(function(data) {
        res.send(data);
    })
    .catch(function(err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    notesDb.allDocs({
        include_docs: true,
        attachments: true
    }).then(function(notes) {
        console.log(notes)
        res.send(notes);
    })
    .catch(function(err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    notesDb.get(req.params.noteId)
    .then(function(note) {
        res.send(note);
    })
    .catch(function(err) {
        if(err.status == 404) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    notesDb.get(req.params.noteId).then(function(doc) {
        return notesDb.put({
            _id: req.params.noteId,
            _rev: doc._rev,
            title: req.body.title || "Untitled Note",
            content: req.body.content,
            parent: doc.parent,
            children: doc.children
        })
        .then(function(note) {
            res.send(note);
        })
        .catch(function(err) {
            if(err.status == 404) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });                
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
    })
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

    function sendDeletedArray() {
        res.send({message: "Note and its children deleted successfully!"});
    }

    var count = 0;

    // Delete a note with the specified noteId in the request
    function deleteSubtree(id) {
        count = count + 1;
        notesDb.get(id, {
            attachments: true
        })
        .then(function(note) {
            // if (!note) {
            //     return
            // }

            var children_array = note.children;
            notesDb.get(id).then(function(doc) {
                return notesDb.remove(doc);
            })
            .then(function(note) {
            // if(!note) {
            //     return res.status(404).send({
            //         message: "Note not found with id " + req.params.noteId
            //     });
            // }
            // res.send({message: "Note deleted successfully!"});
            })
            .catch(function(err) {
                console.log(err)
            });

            if (children_array.length != 0) {
                for(var i = children_array.length-1;i>=0;i--) {
                    deleteSubtree(children_array[i])
                }
            }
            count = count - 1;

            if (count == 0) {
                sendDeletedArray();
            }
        })
        .catch(function(err) {
            console.log(err)
            return
        })
    }

    notesDb.get(req.params.noteId)
    .then(function(note) {
        notesDb.get(note.parent).then(function(parent) {
            var children_array = parent.children
            console.log("Children array before deleting", children_array)
            for (var i = children_array.length - 1; i >= 0; --i) {
                if (children_array[i] == req.params.noteId) {
                    children_array.splice(i, 1);
                    console.log("Children array after deleting", children_array)
                    break;
                }
            }
            notesDb.put({
                _id: parent._id,
                _rev: parent._rev,
                title: parent.title,
                content: parent.content,
                parent: parent.parent,
                children: children_array
            })
        })
        .then(() => {
            deleteSubtree(req.params.noteId)
        })
        .catch(() => {
            deleteSubtree(req.params.noteId)
        })
    })
    .catch(function(err) {
        console.log("Update Error")
    })

    //NEED TO IMPROVE ERROR HANDLING LIKE BELOW

    // .then(note => {
    //     // if(!note) {
    //     //     return res.status(404).send({
    //     //         message: "Note not found with id " + req.params.noteId
    //     //     });
    //     // }
    //     res.send({message: "Note deleted successfully!"});
    // })
    // .catch(err => {
    //     if(err.kind === 'ObjectId' || err.name === 'NotFound') {
    //         return res.status(404).send({
    //             message: "Note not found with id " + req.params.noteId
    //         });                
    //     }
    //     return res.status(500).send({
    //         message: "Could not delete note with id " + req.params.noteId
    //     });
    // });
};

exports.addChild = (req,res) => {
    var parent_id = req.params.noteId
    var children_array;
    notesDb.get(parent_id).then(function(data) {
        children_array =  data.children
    }).then(() => {
        notesDb.post({
            title: "Untitled Note",
            content: "",
            parent: parent_id,
            children: []
        })
        .then(function(data) {
            var child_id = data.id
            children_array.push(child_id)
            notesDb.get(parent_id).then(function(doc) {
                return notesDb.put({
                    _id: parent_id,
                    _rev: doc._rev,
                    title: doc.title,
                    content: doc.content,
                    parent: doc.parent,
                    children: children_array
                })
            })
            .then(() => {
                notesDb.get(data.id).then(function(doc) {
                    res.send(doc);
                })
            });
        })
        .catch(function(err) {
            console.log(err.message)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
    })
    .catch(function(err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    })
};

exports.addSibling = (req,res) => {
    notesDb.get(req.params.noteId).then(function(data) {
        var parent_id = data.parent
        notesDb.get(parent_id).then(function(data) {
            var children_array =  data.children
            notesDb.post({
                title: "Untitled Note",
                content: "",
                parent: parent_id,
                children: []
            })
            .then(function(data) {
                var child_id = data.id
                children_array.push(child_id)
                notesDb.get(parent_id).then(function(doc) {
                    return notesDb.put({
                        _id: parent_id,
                        _rev: doc._rev,
                        title: doc.title,
                        content: doc.content,
                        parent: doc.parent,
                        children: children_array
                    })
                })
                .then(() => {
                    notesDb.get(data.id).then(function(doc) {
                        res.send(doc);
                    })
                });
            })
            .catch(function(err) {
                console.log(err.message)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
            });
        });
    });
};