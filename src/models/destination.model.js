
const query = require('../db/db-connection');
const { multipleColumnSet, getOffset } = require('../utils/common.utils');

class DestinationModel {
    tableName = 'destination';

    find = async (page = 1, limit = 10) => {
        let offset = getOffset(page, limit);
        let sqlData = `SELECT * FROM ${this.tableName} WHERE is_show = 1`;

        sqlData += ` ORDER BY created ASC LIMIT ${offset}, ${limit}`;

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

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result[0];
    }

    create = async ({ name, is_show = 1}) => {
        const sql = `INSERT INTO ${this.tableName} ( name, is_show) VALUES (?,?)`;

        const result = await query(sql, [ name, is_show]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
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

module.exports = new DestinationModel;