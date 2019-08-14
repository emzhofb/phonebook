const express = require('express');
const router = express.Router();

const controller = require('../controllers/phonebooks');

/* GET home page. */
router.get('/', controller.getPhonebook);
router.post('/', controller.postPhonebook);
router.put('/:id', controller.putPhonebook);
router.delete('/:id', controller.deletePhonebook);

module.exports = router;
