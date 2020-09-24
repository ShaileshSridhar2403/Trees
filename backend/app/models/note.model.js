const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    parent : Schema.Types.ObjectId,
    children : Schema.Types.ObjectId
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);