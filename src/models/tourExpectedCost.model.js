
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
class TourExpectedCostModel {
    tableName = 'tour_expected_cost';


    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ tour_id, rates_include_text, price_not_included_text, surcharge_text, cancel_change_text }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( tour_id, rates_include_text, price_not_included_text, surcharge_text, cancel_change_text) VALUES (?,?,?,?,?)`;

        const result = await query(sql, [tour_id, rates_include_text, price_not_included_text, surcharge_text, cancel_change_text]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, tour_id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE tour_id = ?`;
        console.log(sql);
        const result = await query(sql, [...values, tour_id]);

        return result;
    }

    delete = async (tour_id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE tour_id = ?`;

        const result = await query(sql, [tour_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new TourExpectedCostModel;