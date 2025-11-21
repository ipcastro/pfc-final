const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    type: { type: String, default: 'main_content', index: true },
}, { strict: false, collection: 'content' });

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;