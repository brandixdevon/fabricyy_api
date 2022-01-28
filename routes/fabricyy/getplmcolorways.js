const { pool } = require('../dbconfig');

module.exports = async (req, res) => {

  const var_fabyyid = req.params.fabyyid;

  var sqlqry =`SELECT plm_cw_id,cw_name,cw_desc,colorway,garmentway,cw_order FROM plm_colorways WHERE fabyy_id='${var_fabyyid}' ORDER BY cw_order;`;

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

}