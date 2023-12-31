const express = require('express');
const router = express.Router();
const headerTopController = require('../controllers/headerTop.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/', awaitHandlerFactory(headerTopController.findOneNoParam));

router.put('/:id', awaitHandlerFactory(headerTopController.update));

module.exports = router;