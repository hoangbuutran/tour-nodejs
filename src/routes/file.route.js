const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const handleMultipartData = require('../middleware/file.middleware');

router.post('/', handleMultipartData, awaitHandlerFactory(fileController.uploadFile));

module.exports = router;