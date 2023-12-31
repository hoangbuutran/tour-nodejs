const TourModel = require('../models/tour.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const ResponseList = require('../utils/ResponseList.utils');
const ResponseDetail = require('../utils/ResponseDetail.utils');
const tourDetailModel = require('../models/tourDetail.model');
const tourExpectedCostModel = require('../models/tourExpectedCost.model');
const tourDestinationModel = require('../models/tourDestination.model');
dotenv.config();

/******************************************************************************
 *                              Tour Controller
 ******************************************************************************/
class TourController {
    getAlls = async (req, res, next) => {

        let userList = await TourModel.find();

        res.send(new ResponseList(200, '', userList, 199));
    };

    getOfDurations = async (req, res, next) => {
        let data = await TourModel.findTourOfDurations(req.params.id, req.query.page, req.query.limit);

        res.send(new ResponseList(200, 'OK', data.content, data.total));
    }

    getLastTours = async (req, res, next) => {
        let data = await TourModel.getLastTours(req.query.page, req.query.limit);

        res.send(new ResponseList(200, 'OK', data.content, data.total));
    }

    getTourSearchs = async (req, res, next) => {
        let data = await TourModel.getTourSearchs(req.query.duration_id, req.query.text, req.query.page, req.query.limit);

        res.send(new ResponseList(200, 'OK', data.content, data.total));
    }

    getById = async (req, res, next) => {
        const data = await TourModel.findOne({ id: req.params.id });
        if (!data) {
            throw new HttpException(404, 'Tour not found');
        }

        res.send(new ResponseDetail(200, '', data));
    };

    create = async (req, res, next) => {

        this.checkValidation(req);

        const { tour_destination } = req.body;

        const result = await TourModel.create(req.body);

        //save list tour_destination
        for (const element of tour_destination) {
            const bodyTourDestination = {
                tour_id: result.id,
                destination_id: element
            }
            await tourDestinationModel.create(bodyTourDestination);
        }

        // save tour_detail
        const bodyTourDetail = {
            tour_id: result.id,
            detail_text: req.body.detail_text,
            tour_guide_text: req.body.tour_guide_text
        };
        const resultTourDetail = await tourDetailModel.create(bodyTourDetail);
        // save tour_expected_cost
        const bodyTourExpectedCost = {
            tour_id: result.id,
            detail_text: req.body.detail_text,
            rates_include_text: req.body.rates_include_text,
            price_not_included_text: req.body.price_not_included_text,
            surcharge_text: req.body.surcharge_text,
            cancel_change_text: req.body.cancel_change_text
        };
        const resultTourExpectedCost = await tourExpectedCostModel.create(bodyTourExpectedCost);


        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.send(new ResponseDetail(201, 'Tour was created!', null));
    };

    update = async (req, res, next) => {
        this.checkValidation(req);
        const { ...restOfUpdates } = req.body;
        const dataFind = await TourModel.findOne({ id: req.params.id });
        if (!dataFind) {
            throw new HttpException(404, 'Tour not found');
        }
        console.log(restOfUpdates);

        const result = await TourModel.update(restOfUpdates, req.params.id);

         //save list tour_destination
         await tourDestinationModel.delete(req.params.id);
         for (const element of tour_destination) {
            const bodyTourDestination = {
                tour_id: result.id,
                destination_id: element
            }
            await tourDestinationModel.create(bodyTourDestination);
        }

        // save tour_detail
        const bodyTourDetail = {
            tour_id: result.id,
            detail_text: req.body.detail_text,
            tour_guide_text: req.body.tour_guide_text
        };
        await tourDetailModel.update(bodyTourDetail, req.params.id);
        // save tour_expected_cost
        const bodyTourExpectedCost = {
            tour_id: result.id,
            detail_text: req.body.detail_text,
            rates_include_text: req.body.rates_include_text,
            price_not_included_text: req.body.price_not_included_text,
            surcharge_text: req.body.surcharge_text,
            cancel_change_text: req.body.cancel_change_text
        };
        await tourExpectedCostModel.update(bodyTourExpectedCost, req.params.id);


        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' : affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send(new ResponseDetail(200, message, info));

    };

    delete = async (req, res, next) => {
        const result = await TourModel.delete(req.params.id);
        await tourDestinationModel.delete(req.params.id);
        await tourDetailModel.delete(req.params.id);
        await tourExpectedCostModel.delete(req.params.id);

        if (!result) {
            throw new HttpException(404, 'Tour not found');
        }

        res.send(new ResponseDetail(200, 'Tour has been deleted', null));
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
module.exports = new TourController;