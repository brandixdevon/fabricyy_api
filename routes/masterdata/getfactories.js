const { pool } = require('../dbconfig');

module.exports = async (req, res) => {

  
  var sqlqry =`SELECT fac_id, fac_name FROM sys_factory WHERE fac_active='true';`;

  pool.query(sqlqry, (error, results) => {
    if (error) {
      res.status(200).json({ Type: "ERROR", Msg: error.message })
      return;
    }
    else {
      res.status(200).json({ Type: "SUCCESS", Data: results.rows })
      return;
    }

  })

};