const destinationModel = require('../models/destination.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ResponseList = require('../utils/ResponseList.utils');
const ResponseDetail = require('../utils/ResponseDetail.utils');
dotenv.config();

/******************************************************************************
 *                              Destination Controller
 ******************************************************************************/
class DestinationController {
    getAlls = async (req, res, next) => {
        let data = await destinationModel.find(req.query.page, req.query.limit);

        res.send(new ResponseList(200, 'OK', data.content, data.total));
    };

    getById = async (req, res, next) => {
        const data = await destinationModel.findOne({ id: req.params.id });
        if (!data) {
            throw new HttpException(404, 'Destination not found');
        }

        res.send(new ResponseDetail(200, 'OK', data));
    };

    create = async (req, res, next) => {
        this.checkValidation(req);

        const result = await destinationModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.send(new ResponseDetail(201, 'Destination was created!', null));
    };

    update = async (req, res, next) => {
        this.checkValidation(req);
        const { ...restOfUpdates } = req.body;
        const dataFind = await destinationModel.findOne({ id: req.params.id });
        if (!dataFind) {
            throw new HttpException(404, 'Destination not found');
        }
        console.log(restOfUpdates);

        const result = await destinationModel.update(restOfUpdates, req.params.id);


        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        
        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' : affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send(new ResponseDetail(200, message, info));

    };

    delete = async (req, res, next) => {
        const result = await destinationModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Destination not found');
        }
        
        res.send(new ResponseDetail(200, 'Destination has been deleted', null));
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new DestinationController;