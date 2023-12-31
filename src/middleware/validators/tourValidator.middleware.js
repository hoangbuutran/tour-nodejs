const { body, param } = require('express-validator');

exports.createSchema = [
    body('thumnail_url')
        .exists()
        .withMessage('thumnail_url is required')
        .notEmpty()
        .withMessage('thumnail_url must be filled'),
    body('short_detail_text')
        .exists()
        .withMessage('short_detail_text is required')
        .notEmpty()
        .withMessage('short_detail_text must be filled'),
    body('price')
        .exists()
        .withMessage('price is required')
        .notEmpty()
        .withMessage('price must be filled'),
    body('star_review')
        .exists()
        .withMessage('star_review is required')
        .notEmpty()
        .withMessage('star_review must be filled'),
    body('duration_id')
        .exists()
        .withMessage('duration_id is required')
        .notEmpty()
        .withMessage('duration_id must be filled'),
    body('transportation')
        .exists()
        .withMessage('transportation is required')
        .notEmpty()
        .withMessage('transportation must be filled')



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