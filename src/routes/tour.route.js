const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createSchema, updateSchema } = require('../middleware/validators/tourValidator.middleware');

router.get('/of-duration/:id', awaitHandlerFactory(tourController.getOfDurations));
router.get('/last-tour', awaitHandlerFactory(tourController.getLastTours));
router.get('/tour-search', createSchema, awaitHandlerFactory(tourController.getTourSearchs));
router.get('/', updateSchema, awaitHandlerFactory(tourController.getAlls));
router.delete('/:id', awaitHandlerFactory(tourController.delete));
router.post('/', createSchema, awaitHandlerFactory(tourController.create));
router.put('/:id', updateSchema, awaitHandlerFactory(tourController.update));
router.get('/:id', awaitHandlerFactory(tourController.getById));

module.exports = router;