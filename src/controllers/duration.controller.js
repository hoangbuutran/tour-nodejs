const DurationModel = require('../models/duration.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ResponseList = require('../utils/ResponseList.utils');
const ResponseDetail = require('../utils/ResponseDetail.utils');
dotenv.config();

/******************************************************************************
 *                              Duration Controller
 ******************************************************************************/
class DurationController {
    getAlls = async (req, res, next) => {
        let data = await DurationModel.find(req.query.page, req.query.limit);

        res.send(new ResponseList(200, 'OK', data.content, data.total));
    };

    getById = async (req, res, next) => {
        const data = await DurationModel.findOne({ id: req.params.id });
        if (!data) {
            throw new HttpException(404, 'Duration not found');
        }

        res.send(new ResponseDetail(200, 'OK', data));
    };

    create = async (req, res, next) => {
        this.checkValidation(req);

        const result = await DurationModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.send(new ResponseDetail(201, 'Duration was created!', null));
    };

    update = async (req, res, next) => {
        this.checkValidation(req);
        const { ...restOfUpdates } = req.body;
        const dataFind = await DurationModel.findOne({ id: req.params.id });
        if (!dataFind) {
            throw new HttpException(404, 'Duration not found');
        }
        console.log(restOfUpdates);

        const result = await DurationModel.update(restOfUpdates, req.params.id);


        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        
        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' : affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send(new ResponseDetail(200, message, info));

    };

    delete = async (req, res, next) => {
        const result = await DurationModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Duration not found');
        }
        
        res.send(new ResponseDetail(200, 'Duration has been deleted', null));
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
module.exports = new DurationController;