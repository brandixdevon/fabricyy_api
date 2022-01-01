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

  const var_fabricyyid = req.body.fabric_yyid;
  const var_colorset = req.body.colorset;

  var sqlqry_delete = `DELETE FROM plm_colorways WHERE fabyy_id='${var_fabricyyid}';`;
  pool.query(sqlqry_delete);

  Promise.all( var_colorset.map(async (x) => {
         
    var sqlqry = `INSERT INTO plm_colorways(fabyy_id, plm_cw_id, cw_name, cw_desc, colorway, garmentway) VALUES ('${var_fabricyyid}','${x.id}','${x.name}','${x.desc}','${x.colorway}','${x.garmentway}');`;

    pool.query(sqlqry);
    
    })).then(function()
    {
        res.status(200).json({Type: 'SUCCESS', Dataset : "Successfully Added."})
        return;
    })

  


};