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

  const var_fabyyid = req.body.fabyyid;
  const var_olrdataset = req.body.olrdata;

  try
  {
    await pool.query(`DELETE FROM olr_data WHERE fabyy_id='${var_fabyyid}';`);
    await Promise.all(
      await var_olrdataset.map(async (items) => {
        
        var CUSTNAME = String(items.CUSTNAME).replace(/'/g, "''");
        var MASTSTYLEDESC = String(items.MASTSTYLEDESC).replace(/'/g, "''");
        var CUSTSTYLE = String(items.CUSTSTYLE).replace(/'/g, "''");
        var CUSTSTYLEDESC = String(items.CUSTSTYLEDESC).replace(/'/g, "''");
        var MASTCOLORDESC = String(items.MASTCOLORDESC).replace(/'/g, "''");
        var CUSTSIZEDESC = String(items.CUSTSIZEDESC).replace(/'/g, "''");
        var ORDERQTY = String(items.ORDERQTY).replace(/'/g, "''");
        var SEASON = String(items.SEASON).replace(/'/g, "''");

        var sql_qry = `INSERT INTO olr_data(fabyy_id, custname, maststyledesc, custstyle, custstyledesc, mastcolordesc, custsizedesc, orderqty, season) VALUES('${var_fabyyid}', '${CUSTNAME}', '${MASTSTYLEDESC}', '${CUSTSTYLE}', '${CUSTSTYLEDESC}', '${MASTCOLORDESC}', '${CUSTSIZEDESC}', '${ORDERQTY}', '${SEASON}');`;

        await pool.query(sql_qry);

      })

    ).then(function()
    {
      res.status(200).json({ Type: "SUCCESS", Msg: "OLR List Added Successfully !"})
      return;
    })

    
  }
  catch (err)
  {
    res.status(200).json({ Type: "ERROR", Msg: "Data Not Upload Successfully !" })
    return;
  }


};