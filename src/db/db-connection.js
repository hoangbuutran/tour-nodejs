const dotenv = require('dotenv');
dotenv.config();
const mysql2 = require('mysql2');

class DBConnection {
    constructor() {
        this.db = mysql2.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: 3306,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        });

        this.checkConnection();

        this.initHeaderTop();

    }


    initHeaderTop = async () => {
        const tableName = 'header_top';

        let sqlCheck = `SELECT * FROM ${tableName} LIMIT 1`;

        const dataFind = await this.query(sqlCheck);

        if (!dataFind) {
            console.log("Header Top Has Inserted");
        }
        const dataInit = {
            phone_number: null,
            facebook_url: null,
            x_url: null,
            whatsap_url: null,
            zalo_url: null
        }

        const sqlCreate = `INSERT INTO ${tableName} (phone_number, facebook_url, x_url , whatsap_url, zalo_url) VALUES (?,?,?,?,?)`;

        const result = await this.query(
            sqlCreate,
            [
                dataInit.phone_number,
                dataInit.facebook_url,
                dataInit.x_url,
                dataInit.whatsap_url,
                dataInit.zalo_url,
            ]);
    }

    checkConnection() {
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection) {
                connection.release();
            }
            return
        });
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
            // execute will internally call prepare and query
            this.db.execute(sql, values, callback);
        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            // convert mysql errors which in the mysqlErrorList list to http status code
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

            throw err;
        });
    }
}

// like ENUM
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});


module.exports = new DBConnection().query;