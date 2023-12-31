const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class HeaderTopModel {
    
    tableName = 'header_top';

    findOneNoParam = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName} LIMIT 1`;
        
        const result = await query(sql);
        return result[0];

    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result[0];
    }

    create = async ({ phone_number, facebook_url, x_url, whatsap_url, zalo_url }) => {
        const sql = `INSERT INTO ${this.tableName} (phone_number, facebook_url, x_url , whatsap_url, zalo_url) VALUES (?,?,?,?,?)`;

        const result = await query(sql, [phone_number, facebook_url, x_url, whatsap_url, zalo_url]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
        console.log(sql);
        const result = await query(sql, [...values, id]);

        return result;
    }

}

module.exports = new HeaderTopModel;