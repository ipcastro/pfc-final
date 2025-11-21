const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({}, { strict: false, timestamps: true, collection: 'pages' });

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;