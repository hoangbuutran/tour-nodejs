const HeaderTopModel = require('../models/headerTop.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');

const dotenv = require('dotenv');
const ResponseList = require('../utils/ResponseList.utils');
const ResponseDetail = require('../utils/ResponseDetail.utils');
dotenv.config();

/******************************************************************************
 *                              HeaderTop Controller
 ******************************************************************************/
class HeaderTopController {
    

    findOneNoParam = async (req, res, next) => {
        const data = await HeaderTopModel.findOneNoParam();

        res.send(new ResponseDetail(200, '', data));
    };

    update = async (req, res, next) => {
        this.checkValidation(req);
        const { ...restOfUpdates } = req.body;
        const dataFind = await HeaderTopModel.findOne({ id: req.params.id });
        if (!dataFind) {
            throw new HttpException(404, 'Duration not found');
        }
        console.log(restOfUpdates);

        const result = await HeaderTopModel.update(restOfUpdates, req.params.id);


        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        
        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' : affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send(new ResponseDetail(200, message, info));

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
module.exports = new HeaderTopController;