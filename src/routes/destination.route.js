const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destination.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createSchema } = require('../middleware/validators/destinationValidator.middleware');

router.get('/', awaitHandlerFactory(destinationController.getAlls)); // localhost:3000/api/v1/users
router.get('/:id', awaitHandlerFactory(destinationController.getById)); // localhost:3000/api/v1/users/id/1
router.post('/', createSchema, awaitHandlerFactory(destinationController.create)); // localhost:3000/api/v1/users
router.put('/:id', createSchema, awaitHandlerFactory(destinationController.update)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/:id', awaitHandlerFactory(destinationController.delete)); // localhost:3000/api/v1/users/id/1

module.exports = router;