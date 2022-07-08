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

    var qry_delete = `DELETE FROM olr_data WHERE fabyy_id='${var_fabyyid}';`;
    var response_delete = await query(qry_delete);

    for (var row_olrdataset in var_olrdataset)
    {
        var obj_olrdataset = var_olrdataset[row_olrdataset];
        
        var CUSTNAME = String(obj_olrdataset.CUSTNAME).replace(/'/g, "''");
        var DIVISIONCODE = String(obj_olrdataset.DIVISIONCODE).replace(/'/g, "''");
        var VPONO = String(obj_olrdataset.VPONO).replace(/'/g, "''");
        var TECHPACKNO = String(obj_olrdataset.TECHPACKNO).replace(/'/g, "''");
        var MASTSTYLEDESC = String(obj_olrdataset.MASTSTYLEDESC).replace(/'/g, "''");
        var CUSTSTYLE = String(obj_olrdataset.CUSTSTYLE).replace(/'/g, "''");
        var CUSTSTYLEDESC = String(obj_olrdataset.CUSTSTYLEDESC).replace(/'/g, "''");
        var MASTCOLORDESC = String(obj_olrdataset.MASTCOLORDESC).replace(/'/g, "''");
        var MASTSIZEDESC = String(obj_olrdataset.MASTSIZEDESC).replace(/'/g, "''");
        var ORDERQTY = String(obj_olrdataset.ORDERQTY).replace(/'/g, "''");
        var SEASON = String(obj_olrdataset.SEASON).replace(/'/g, "''");

        var sql_qry = `INSERT INTO olr_data(fabyy_id, custname, division, maststyledesc, custstyle, custstyledesc, mastcolordesc, custsizedesc, orderqty, season, vpono, techpackno) VALUES('${var_fabyyid}', '${CUSTNAME}', '${DIVISIONCODE}', '${MASTSTYLEDESC}', '${CUSTSTYLE}', '${CUSTSTYLEDESC}', '${MASTCOLORDESC}', '${MASTSIZEDESC}', '${ORDERQTY}', '${SEASON}', '${VPONO}', '${TECHPACKNO}');`;

        var response_insert = await query(sql_qry);
    }

    res.status(200).json({ Type: "SUCCESS", Msg: "OLR List Added Successfully !"})
    return;
    
  //Postgres Query Run With Async Await
  async function query(q) {
    const client = await pool.connect()
    let res
    try {
      await client.query('BEGIN')
      try {
        res = await client.query(q)
        await client.query('COMMIT')
      } catch (err) {
        await client.query('ROLLBACK')
        throw err
      }
    } finally {
      client.release()
    }
    return res
  }


};