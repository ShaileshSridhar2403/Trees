const Links = require('../models/links.model.js');

// Retrieve and return all links from the database.
exports.findAll = (req, res) => {
    Links.find()
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
    Links.findOne()
    .then(linkData => {
        // if links is empty
        if (!linkData) {
            console.log("backend empty", linkData)
            // Create Links
            const l = new Links({
                links: req.body.links, 
            });
            console.log("created", l)
            // Save Links in the database
            l.save()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating Links."
                });
            });
        }
        // else
        else {
            // Find links and update it with the request body
            console.log("backend non-empty", linkData, req.body.links)
            Links.update(
                {_id: linkData._id},
                {links: req.body.links || ""},
                {new: true})
            .then(updatedLinkData => {
                console.log("inside update", updatedLinkData)
                res.send(updatedLinkData);
            })
            .catch(err => {
                return res.status(500).send({
                    message: err.message || "Some error occurred while updating links."
                });
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving links."
        });
    });


    
};

// Find links and update it with the request body
exports.update = (req, res) => {
    Links.findOneAndUpdate({
        links: req.body.links || "",
    }, {new: true})
    .then(links => {
        res.send(links);
    })
    .catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while updating links."
        });
    });
}