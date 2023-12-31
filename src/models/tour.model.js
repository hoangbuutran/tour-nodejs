const query = require('../db/db-connection');
const { multipleColumnSet, getOffset } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
class TourModel {
    
    tableName = 'tour';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {

            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }


    findTourOfDurations = async (duration_id, page = 1, limit = 10) => {
        let offset = getOffset(page, limit);
        let sqlData = `SELECT * FROM ${this.tableName} WHERE duration_id = ? LIMIT ${offset}, ${limit}`;
        let sqlCount = `SELECT COUNT(*) AS total FROM ${this.tableName} WHERE duration_id = ?`;
        const resultData = await query(sqlData, [duration_id]);
        const resultCount = await query(sqlCount, [duration_id]);

        return {
            content: resultData,
            total: resultCount[0]["total"]
        };
    }


    getLastTours = async (page = 1, limit = 10) => {
        let offset = getOffset(page, limit);
        let sqlData = `SELECT * FROM ${this.tableName}`;

        sqlData += ` ORDER BY created DESC LIMIT ${offset}, ${limit}`;

        let sqlCount = `SELECT COUNT(*) total FROM (${sqlData}) as totalQuery`;

        const resultData = await query(sqlData);

        const resultCount = await query(sqlCount);

        return {
            content: resultData,
            total: resultCount[0]["total"]
        };
    }


    getTourSearchs = async (duration_id, text, order = 'DESC', page = 1, limit = 10) => {
        let offset = getOffset(page, limit);
        let sqlData = `SELECT * FROM ${this.tableName}`;
        // Mảng để lưu trữ các điều kiện của WHERE
        const conditions = [];

        // Nếu có giá trị cho duration_id, thêm điều kiện WHERE vào mảng conditions
        if (duration_id) {
            conditions.push(`duration_id = ${duration_id}`);
        }
        if (text) {
            conditions.push(`(title LIKE '%${text}%' OR short_detail_text LIKE '%${text}%')`);
        }

        // Nếu có điều kiện WHERE, thêm vào câu truy vấn SQL
        if (conditions.length > 0) {
            sqlData += ` WHERE ${conditions.join(' AND ')}`;
        }

        sqlData += ` ORDER BY created ${order} LIMIT ${offset}, ${limit}`;

        let sqlCount = `SELECT COUNT(*) total FROM (${sqlData}) as totalQuery`;

        const resultData = await query(sqlData);

        const resultCount = await query(sqlCount);

        return {
            content: resultData,
            total: resultCount[0]["total"]
        };
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT 
            tour.id, 
            tour.title, 
            tour.thumnail_url, 
            tour.short_detail_text, 
            tour.price, 
            tour.star_review,
            tour.duration_id as duration_id,
            duration.title as duration_title,
            tour.transportation,
            tour.is_populor,
            tour_detail.detail_text,
            tour_detail.tour_guide_text, 
            tour_expected_cost.rates_include_text,
            tour_expected_cost.price_not_included_text,
            tour_expected_cost.surcharge_text,
            tour_expected_cost.cancel_change_text
        FROM ${this.tableName} AS tour 
        LEFT JOIN tour_detail AS tour_detail ON tour.id = tour_detail.tour_id
        LEFT JOIN tour_expected_cost AS tour_expected_cost ON tour.id = tour_expected_cost.tour_id
        LEFT JOIN duration AS duration ON tour.duration_id = duration.id

        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        
        return result[0];
    }

    create = async ({day_start, title, thumnail_url, short_detail_text, price, sale_price, star_review, duration_id, transportation, is_populor = 0 }) => {
        const sql = `INSERT INTO ${this.tableName}
        (day_start, title, thumnail_url, short_detail_text, price, sale_price, star_review, duration_id, transportation, is_populor) VALUES (?,?,?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [day_start, title, thumnail_url, short_detail_text, price, sale_price, star_review, duration_id, transportation, is_populor]);
        const affectedRows = result ? result.affectedRows : 0;

        return {affectedRows, result};
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
        console.log(sql);
        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;

        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new TourModel;