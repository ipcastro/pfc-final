const express = require('express');
const router = express.Router();
const hqController = require('../controllers/HqController');

// Rotas para HQs
router.get('/', hqController.getHq);
router.post('/', hqController.saveHq);
router.put('/', hqController.updateHq);
router.delete('/', hqController.deleteHq);

module.exports = router;