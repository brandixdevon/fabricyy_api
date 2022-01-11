const { pool } = require('../dbconfig');
const moment = require('moment');

module.exports = async (req, res) => {

  //Check Body Is Empty

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {

    res.status(200).json({ Type: "ERROR", Msg: "Oops! Empty Data Set." })
    return;

  }

  //Check Element Count

  if (Object.keys(req.body).length != 2) {

    res.status(200).json({ Type: "ERROR", Msg: "Oops! Can't Find Correct Dataset" })
    return;

  }

  const var_username = req.body.username;
  const var_typeid = req.body.typeid;

  var sqlqry ='';

  if(var_typeid === "ALL")
  {
    sqlqry = `SELECT fabricyy_master.*,sys_customer.cus_name,sys_factory.fac_name FROM fabricyy_master 
    INNER JOIN sys_customer ON fabricyy_master.cus_id = sys_customer.cus_id 
    INNER JOIN sys_factory ON fabricyy_master.fac_id = sys_factory.fac_id 
    WHERE fabricyy_master.fabyy_status != 'Delete' AND fabricyy_master.username = '${var_username}' ORDER BY fabricyy_master.fabyy_id DESC;`;
  }
  else
  {
    sqlqry = `SELECT fabricyy_master.*,fabricyy_details.*,sys_customer.cus_name,sys_factory.fac_name FROM fabricyy_master 
    INNER JOIN sys_customer ON fabricyy_master.cus_id = sys_customer.cus_id 
    INNER JOIN sys_factory ON fabricyy_master.fac_id = sys_factory.fac_id
	LEFT JOIN fabricyy_details ON fabricyy_master.fabyy_id = fabricyy_details.fabyy_id 
    WHERE fabricyy_master.fabyy_status != 'Delete' AND fabricyy_master.username = '${var_username}' AND fabricyy_master.fabyy_id = '${var_typeid}';`;
  }

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