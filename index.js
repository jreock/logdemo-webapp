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
  return `${timestamp} (${label}) ${level}: ${message}`;
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
  var key = Math.floor(Math.random() * Math.floor(10000));
  var select = (Math.floor(Math.random() * Math.floor(3)));
  res.send(`Selected option ${select} against key ${key}`);
  switch (select) {      
    case 0 : dbutils.dbOp("insert",logger,key);
    case 1 : dbutils.dbOp("delete",logger,key);
    case 2 : dbutils.dbOp("select",logger,key);
  }

}

app.get('/', (req, res) => procRequest(req, res));

app.listen(port, () => logger.info(`Logdemo listening at http://localhost:${port}`))