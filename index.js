const express = require ('express');
const app = express();
const port = 3000;
const dbutils = require ('./dbutils');

/*
*  Easy way -- JSON Formatted logging
const winston = require ('winston');
const logger = winston.createLogger({
    level: 'info',
    format: 
});
*/

/*  Typical Way - Bespoke Formatting */

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} (${label}) [${level}]: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: 'logging-webinar' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({ filename: 'debug-logging-webinar.log', level: 'debug' }),
    new transports.File({ filename: 'error-logging-webinar.log', level: 'error' }),
    new transports.File({ filename: 'logging-webinar.log' })
  ]
});

function procRequest (req, res) {

  res.send("Hello World from a function!");
  // TODO -- pick a random op and execute it
  dbutils.dbOp("insert",logger,"blah");

}

app.get('/', (req, res) => procRequest(req, res));

app.listen(port, () => logger.info(`Example app listening at http://localhost:${port}`))