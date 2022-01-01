require('dotenv').config()
const sql = require('mssql');

const config = {
  user: 'BEL_COG_User',
  password: '0okm9ijn@123',
  server: 'bci-ctsql-01\\belctsql', // You can use 'localhost\\instance' to connect to named instance
  database: 'PLM_ISG',
  connectionTimeout: 150000000,
  requestTimeout: 150000000,
  options: {
    enableArithAbort: false,
    encrypt: false,
  },
};

let mssqlpool = sql.connect(config);

module.exports = { mssqlpool }