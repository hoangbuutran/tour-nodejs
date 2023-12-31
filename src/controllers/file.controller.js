const handleMultipartData = require('../middleware/file.middleware');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const ResponseList = require('../utils/ResponseList.utils');
const ResponseDetail = require('../utils/ResponseDetail.utils');
dotenv.config();

/******************************************************************************
 *                              File Controller
 ******************************************************************************/
class FileController {
    uploadFile = async (req, res, next) => {
        try {
            console.log('data', req.body); // Log body or specific part of req if needed
    
            if (!req.file) {
                return res.status(400).json(new ResponseDetail(400, 'No file uploaded', null));
            }
    
            // If control reached here, it means file handling by multer has already been done
            // Do any additional processing if needed and send the response
            res.status(200).json(new ResponseDetail(200, 'File uploaded successfully', null));
        } catch (error) {
            console.error('Error in uploadFile:', error);
            res.status(500).json(new ResponseDetail(500, 'Internal server error', null));
        }
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
module.exports = new FileController;