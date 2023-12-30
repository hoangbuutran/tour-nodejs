const DurationModel = require('../models/duration.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Duration Controller
 ******************************************************************************/
class DurationController {
    getAllDurations = async (req, res, next) => {
        let userList = await DurationModel.find();
        if (!userList.length) {
            throw new HttpException(404, 'Durations not found');
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.send(userList);
    };

    getById = async (req, res, next) => {
        const user = await DurationModel.findOne({ id: req.params.id });
        if (!user) {
            throw new HttpException(404, 'Duration not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    getByUserName = async (req, res, next) => {
        const user = await DurationModel.findOne({ username: req.params.username });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    create = async (req, res, next) => {
        this.checkValidation(req);

        const result = await DurationModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Duration was created!');
    };

    update = async (req, res, next) => {
        this.checkValidation(req);
;

        res.send({ message: '', info: '' });
    };

    delete = async (req, res, next) => {
        const result = await DurationModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Duration not found');
        }
        res.send('Duration has been deleted');
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