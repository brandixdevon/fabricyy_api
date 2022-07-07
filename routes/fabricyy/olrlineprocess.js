const { pool } = require('../dbconfig');
const moment = require('moment');

module.exports = async (req, res) => {

  const var_fabyyid = req.params.fabyyid;

  var qry_del_olritems = `DELETE FROM olr_items WHERE fabyy_id='${var_fabyyid}';`;

  var result_del_olritems = await query(qry_del_olritems);

  var qry_get_olrcolor = `SELECT colorname,flex,vpono,division FROM olr_colorset WHERE fabyy_id='${var_fabyyid}' ORDER BY colorname,vpono,division;`;

  var result_get_olrcolor = await query(qry_get_olrcolor);

  var qry_get_olrsizes = `SELECT sizename FROM olr_sizeset WHERE fabyy_id='${var_fabyyid}' ORDER BY sizename;`;

  var result_get_olrsizes = await query(qry_get_olrsizes);

      for (var i = 0; i < result_get_olrcolor.rows.length; i++)
      {
        var insertrow = await query(`INSERT INTO olr_items(fabyy_id,color, flex, vpono, division, garmentway, prod_plant) VALUES ('${var_fabyyid}','${result_get_olrcolor.rows[i].colorname}','${result_get_olrcolor.rows[i].flex}','${result_get_olrcolor.rows[i].vpono}','${result_get_olrcolor.rows[i].division}','','');`);
            
        var valinc = 0;

        for (var y = 0; y < result_get_olrsizes.rows.length; y++)
        {
            valinc = valinc+1;

            var qry_update = `UPDATE olr_items SET s${valinc}_name='${result_get_olrsizes.rows[y].sizename}', s${valinc}_qty=temptable.orderqty FROM (SELECT COALESCE(SUM(orderqty),0) as orderqty FROM olr_data WHERE fabyy_id='${var_fabyyid}' AND mastcolordesc='${result_get_olrcolor.rows[i].colorname}' AND custsizedesc='${result_get_olrsizes.rows[y].sizename}' AND vpono='${result_get_olrcolor.rows[i].vpono}') AS temptable WHERE fabyy_id='${var_fabyyid}' AND color='${result_get_olrcolor.rows[i].colorname}' AND vpono='${result_get_olrcolor.rows[i].vpono}';`
        
            var result_update_olritems = await query(qry_update);
        }
      }

      res.status(200).json({ Type: "SUCCESS", Msg: "Item List Successfully Added."})
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

}