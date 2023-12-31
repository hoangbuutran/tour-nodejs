
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class TourDestinationModel {
    tableName = 'tour_destination';


    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result[0];
    }

    create = async ({ tour_id, detail_text, tour_guide_text }) => {
        const sql = `INSERT INTO ${this.tableName}
        (tour_id, destination_id) VALUES (?,?)`;

        const result = await query(sql, [tour_id, detail_text, tour_guide_text]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE tour_id = ?`;

        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new TourDestinationModel;