const { pool } = require('../dbconfig');
const moment = require('moment');

module.exports = async (req, res) => {

  const var_fabyyid = req.params.fabyyid;

  var sqlqry =`SELECT item_id,plm_item_id,plm_actual,plm_item_name,plm_item_desc,plm_colorway_type,plm_supplier,plm_fab_type,plm_cw,plm_placement,plm_color,item_price,TO_CHAR(item_ordering::date,'yyyy/mm/dd') as item_ordering,TO_CHAR(item_order_rev1::date,'yyyy/mm/dd') as item_order_rev1,TO_CHAR(item_order_rev2::date,'yyyy/mm/dd') as item_order_rev2,TO_CHAR(item_order_rev3::date,'yyyy/mm/dd') as item_order_rev3,item_comment FROM plm_items WHERE fabyy_id='${var_fabyyid}' ORDER BY plm_supplier,plm_item_desc,plm_placement,plm_color;`;

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