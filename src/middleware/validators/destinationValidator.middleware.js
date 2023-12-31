const { body, param } = require('express-validator');

exports.createSchema = [
    body('name')
        .exists()
        .withMessage('name is required')
        .notEmpty()
        .withMessage('name must be filled'),
    body('is_show')
        .exists()
        .withMessage('is_show is required')
        .notEmpty()
        .withMessage('is_show must be filled')
    

];
