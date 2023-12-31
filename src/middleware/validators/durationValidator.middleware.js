const { body, param } = require('express-validator');

exports.createSchema = [
    body('url_domain')
        .exists()
        .withMessage('url_domain is required')
        .notEmpty()
        .withMessage('url_domain must be filled'),
    body('title')
        .exists()
        .withMessage('title is required')
        .notEmpty()
        .withMessage('title must be filled'),
    body('short')
        .exists()
        .withMessage('short is required')
        .notEmpty()
        .withMessage('short must be filled')

];

exports.updateSchema = [
    param('id')
        .exists()
        .withMessage('id is required')
        .notEmpty()
        .withMessage('id must be filled'),
    body('url_domain')
        .exists()
        .withMessage('url_domain is required')
        .notEmpty()
        .withMessage('url_domain must be filled'),
    body('title')
        .exists()
        .withMessage('title is required')
        .notEmpty()
        .withMessage('title must be filled'),
    body('short')
        .exists()
        .withMessage('short is required')
        .notEmpty()
        .withMessage('short must be filled')

];