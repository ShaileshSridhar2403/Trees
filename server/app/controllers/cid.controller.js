var PouchDB = require('pouchdb');
var cidDb = new PouchDB('cidDb');

exports.findOne = (req, res) => {
    cidDb.get('cid')
    .then(function(cid) {
        console.log("current id", cid)
        res.send(cid);
    })
    .catch(function(err) {
        if(err.status == 404) {
            return res.status(404).send({
                message: "Current ID not found"
            });                
        }
        return res.status(500).send({
            message: "Error retrieving current ID"
        });
    });
};

exports.update = (req, res) => {
    cidDb.get('cid')
    .then(function(currentId) {
        // Find current ID and update it with the request body
        console.log("updating current ID", currentId, req.body.cid)
        cidDb.get('cid').then(function(doc) {
            return cidDb.put({
                _id: 'cid',
                _rev: doc._rev,
                cid: req.body.cid || "",
            })
        })
        .then(updatedCurrentId => {
            console.log("updated current ID", updatedCurrentId)
            res.send(updatedCurrentId);
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while updating current ID."
            });
        });
    })
    .catch(function() {
        console.log("backend empty, creating new cid", req.body.cid)
        // Create and Save Links in the database
        cidDb.put({
            _id: 'cid',
            cid: req.body.cid, 
        })
        .then(data => {
            console.log("new current ID", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating current ID."
            });
        });
    })
};
