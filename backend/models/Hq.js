const mongoose = require('mongoose');

const hqSchema = new mongoose.Schema({
    type: { type: String, default: 'main_hq', index: true },
}, { strict: false, collection: 'hq' });

const Hq = mongoose.model('Hq', hqSchema);
module.exports = Hq;