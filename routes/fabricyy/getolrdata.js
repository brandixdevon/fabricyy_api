const { pool } = require('../dbconfig');
const moment = require('moment');

module.exports = async (req, res) => {

  const var_fabyyid = req.params.fabyyid;

  var sqlqry =`SELECT *,
  COALESCE(s1_qty,0)+
  COALESCE(s2_qty,0)+
  COALESCE(s3_qty,0)+
  COALESCE(s4_qty,0)+
  COALESCE(s5_qty,0)+
  COALESCE(s6_qty,0)+
  COALESCE(s7_qty,0)+
  COALESCE(s8_qty,0)+
  COALESCE(s9_qty,0)+
  COALESCE(s10_qty,0)+
  COALESCE(s11_qty,0)+
  COALESCE(s12_qty,0)+
  COALESCE(s13_qty,0)+
  COALESCE(s14_qty,0)+
  COALESCE(s15_qty,0)+
  COALESCE(s16_qty,0)+
  COALESCE(s17_qty,0)+
  COALESCE(s18_qty,0)+
  COALESCE(s19_qty,0)+
  COALESCE(s20_qty,0)+
  COALESCE(s21_qty,0)+
  COALESCE(s22_qty,0)+
  COALESCE(s23_qty,0)+
  COALESCE(s24_qty,0)+
  COALESCE(s25_qty,0)+
  COALESCE(s26_qty,0)+
  COALESCE(s27_qty,0)+
  COALESCE(s28_qty,0)+
  COALESCE(s29_qty,0)+
  COALESCE(s30_qty,0) as sub_total FROM olr_items WHERE fabyy_id='${var_fabyyid}' ORDER BY color;`;

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