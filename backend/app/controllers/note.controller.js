const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content
    });

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
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
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    })
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
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
        Note.findById(id)
        .then(note => {
            if (!note) {
                return
            }

            var children_array = note.children;
            Note.findByIdAndRemove(id)
            .then(note => {
            // if(!note) {
            //     return res.status(404).send({
            //         message: "Note not found with id " + req.params.noteId
            //     });
            // }
            // res.send({message: "Note deleted successfully!"});
            })
            .catch(err => {
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
        .catch(err =>{
            console.log(err)
        })
    }

    Note.findById(req.params.noteId)
    .then(note => {
        Note.update({ _id: note.parent }, { $pull: { children: req.params.noteId } })
        .then(() => {
            deleteSubtree(req.params.noteId)
        })
    })
    .catch(err =>{
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
    const note = new Note({
        title:  "Untitled Note", 
        content: "",
        parent: req.params.noteId
    });

    var parent_id = req.params.noteId
    var children_array;
    Note.findById(parent_id).then(data => {
        children_array =  data.children
    })

    note.save()
    .then(data => {
        var child_id = data.id
        children_array.push(child_id)
        Note.findByIdAndUpdate(parent_id, {
            children: children_array
        }, {new: true})
        .then(() => {
            res.send(data);
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.addSibling = (req,res) => {
    Note.findById(req.params.noteId).then(data => {
        var parent_id = data.parent
        const note = new Note({
            title:  "Untitled Note", 
            content: "",
            parent: parent_id
        });

        Note.findById(parent_id).then(data => {
            var children_array =  data.children

            note.save()
            .then(data => {
                var child_id = data.id
                children_array.push(child_id)
                Note.findByIdAndUpdate(parent_id, {
                    children: children_array
                }, {new: true})
                .then(() => {
                    res.send(data);
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
            });
        });
    });
};

exports.getTreeData = (req, res) => {

    /// TODO: Get first id of the mongoose collection
    Note.findById("5ff1fe6bb172fe1c08d18fbd")
    .then(note => {
        var d = driver(note)
        console.log("hello", d)
    })
    res.send({message: "Note and its children gotten successfully!"});

    // Delete a note with the specified noteId in the request
    function recurseSubtree(id) {
        console.log("entered recursion")
        Note.findById(id)
        .then(note => {
            console.log(note)
            if (note.children.length == 0) {
                console.log("zero children")
                return new Promise ([])
            }
            // var l = []
            // console.log("not zero children")
            // note.children.forEach(id => {
            //     Note.findById(id)
            //     .then(child_note => {
            //         var d = {
            //             "name": child_note.title,
            //             "size": [100, 100],
            //             "children": recurseSubtree(id)
            //         }
            //         console.log("recurse", d)
            //         l.push(d)
            //     })
            // });
            // return l
            return ([])
        })
        .catch(err =>{
            console.log(err)
        })
    }

    function driver(note) {
        var l = []
        note.children.forEach(id => {
            
            Note.findById(id)
            .then(child_note => {
                var d = {
                    "name": child_note.title,
                    "size": [100, 100],
                    "children": recurseSubtree(id)
                }
                console.log("driver", id)
                console.log("driver", d)
                l.push(d)
            })
        });
        return ({
            "name": "Master",
            "size": [100, 100],
            "children": l
        })
    }
}