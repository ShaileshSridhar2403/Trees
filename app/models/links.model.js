const mongoose = require('mongoose');

const LinksSchema = mongoose.Schema({
    links: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Links', LinksSchema);