// const Links = require('../models/links.model.js');
var PouchDB = require('pouchdb');
var linksDb = new PouchDB('linksDb');

// Retrieve and return all links from the database.
exports.findAll = (req, res) => {
    linksDb.get('links', {
        attachments: true
    })
    .then(links => {
        res.send(links);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving links."
        });
    });
};

// Create and Save Links, or updated the existing Links
exports.create = (req, res) => {
    linksDb.get('links', {
        attachments: true
    })
    .then(function(linkData) {
        // Find links and update it with the request body
        console.log("backend non-empty", linkData, req.body.links)
        linksDb.get('links').then(function(doc) {
            return linksDb.put({
                _id: 'links',
                _rev: doc._rev,
                links: req.body.links || "",
            })
        })
        .then(updatedLinkData => {
            console.log("inside update", updatedLinkData)
            res.send(updatedLinkData);
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while updating links."
            });
        });
    })
    .catch(function() {
        console.log("backend empty")
        // Create and Save Links in the database
        linksDb.put({
            _id: 'links',
            links: req.body.links, 
        })
        .then(data => {
            res.send(data);
            console.log("created", l);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating Links."
            });
        });
    })
};

// This function has been commented since we are making a POST request
// on every operation - check if it should be optimized to a PUT request
// Find links and update it with the request body
// exports.update = (req, res) => {
//     linksDb.get('links').then(function(doc) {
//         return linksDb.put({
//             _id: 'links',
//             _rev: doc._rev,
//             links: req.body.links || "",
//         })
//     })
//     .then(links => {
//         res.send(links);
//     })
//     .catch(err => {
//         return res.status(500).send({
//             message: err.message || "Some error occurred while updating links."
//         });
//     });
// }