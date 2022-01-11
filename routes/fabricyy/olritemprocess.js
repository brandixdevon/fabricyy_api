const { pool } = require('../dbconfig');
const moment = require('moment');

module.exports = async (req, res) => {

  const var_fabyyid = req.params.fabyyid;

  var result_del_olrcolor = await deleteRows(`DELETE FROM olr_colorset WHERE fabyy_id='${var_fabyyid}';`);

  var result_ins_olrcolor = await insertRows(`INSERT INTO olr_colorset(fabyy_id, colorname, flex) SELECT fabyy_id,mastcolordesc as colorname,RIGHT(mastcolordesc, 4) as flex FROM olr_data WHERE fabyy_id='${var_fabyyid}' GROUP BY mastcolordesc,fabyy_id ORDER BY mastcolordesc;`)

  var result_del_olrsize = await deleteRows(`DELETE FROM olr_sizeset WHERE fabyy_id='${var_fabyyid}';`);

  var result_ins_olrsize = await insertRows(`INSERT INTO olr_sizeset(fabyy_id, sizename) SELECT fabyy_id,custsizedesc as sizename FROM olr_data WHERE fabyy_id='${var_fabyyid}' GROUP BY custsizedesc,fabyy_id ORDER BY custsizedesc;`)
  
  res.status(200).json({ Type: "SUCCESS", Msg: "Item List Processing Successfully."})
  return;

  async function deleteRows(sqlqry_delete){
      try {
          
        const res = await pool.query(sqlqry_delete);
        return ({Type:"SUCCESS" });
      } catch (err) {
        return ({Type:"ERROR" });
      }
  }

  async function insertRows(sqlqry_insert){
        try {
            
          const res = await pool.query(sqlqry_insert);
          return ({Type:"SUCCESS" });
        } catch (err) {
          return ({Type:"ERROR" });
        }
  }

  async function selectFrom(selectqry) {
    try {
      const res = await pool.query(selectqry);
      return ({Type:"SUCCESS", Data: res.rows });
    } catch (err) {
      return ({Type:"ERROR", Data: err.stack });
    }
  }

}