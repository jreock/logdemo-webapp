const {
    Pool,
    Client
} = require('pg');
const pool = new Pool();

pool.connect();

var self = {

    dbOp : async function(op, logger, data) {

        var statement = "";

        if (op == "delete") {
            statement = `DELETE from logdemo WHERE key = '${data}'`;
        }
        if (op == "insert") {
            statement = `INSERT INTO logdemo (text) VALUES ('${data}')`;
        }
        if (op == "select") {
            statement = `SELECT * FROM logdemo WHERE key = '${data}'`;
        }

        logger.debug(`Received request to execute "${statement}"`);
        await pool.query(statement, (err, res) => {
            logger.debug(`Executing "${statement}"`);
            if (err != null) {
                logger.error(err + res);
            }
            logger.info(`Processed request to execute "${statement}`);
        });
    }

}

module.exports = self;
