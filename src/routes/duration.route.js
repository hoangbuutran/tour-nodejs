const express = require('express');
const router = express.Router();
const durationController = require('../controllers/duration.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createSchema, updateSchema } = require('../middleware/validators/durationValidator.middleware');

router.get('/', awaitHandlerFactory(durationController.getAlls)); // localhost:3000/api/v1/users
router.get('/:id', awaitHandlerFactory(durationController.getById)); // localhost:3000/api/v1/users/id/1
router.post('/', createSchema, awaitHandlerFactory(durationController.create)); // localhost:3000/api/v1/users
router.put('/:id', updateSchema, awaitHandlerFactory(durationController.update)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/:id', awaitHandlerFactory(durationController.delete)); // localhost:3000/api/v1/users/id/1

module.exports = router;