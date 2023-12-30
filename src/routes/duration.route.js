const express = require('express');
const router = express.Router();
const durationController = require('../controllers/duration.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createSchema } = require('../middleware/validators/durationValidator.middleware');

router.get('/', awaitHandlerFactory(durationController.getAllDurations)); // localhost:3000/api/v1/users
router.get('/check', awaitHandlerFactory(durationController.getAllDurations)); // localhost:3000/api/v1/users/check
router.get('/id/:id', auth(), awaitHandlerFactory(durationController.getById)); // localhost:3000/api/v1/users/id/1
router.get('/username/:username', auth(), awaitHandlerFactory(durationController.getByUserName)); // localhost:3000/api/v1/users/usersname/julia
router.post('/', createSchema, awaitHandlerFactory(durationController.create)); // localhost:3000/api/v1/users
router.patch('/id/:id', createSchema, awaitHandlerFactory(durationController.update)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(durationController.delete)); // localhost:3000/api/v1/users/id/1

module.exports = router;