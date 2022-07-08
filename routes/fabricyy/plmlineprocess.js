const { pool } = require('../dbconfig');

module.exports = async (req, res) => {

        const var_fabyyid = req.params.fabyyid;

        var sqlqry_deleteplmvpo =`DELETE FROM plm_items_vpo WHERE fabyy_id='${var_fabyyid}';`;

        const respose_delete = await query(sqlqry_deleteplmvpo);

        var sqlqry_selectplm =`SELECT * FROM plm_items WHERE fabyy_id='${var_fabyyid}' ORDER BY gmt_color_order;`;

        const results_selectplm = await query(sqlqry_selectplm);

        for (var row_selectplm in results_selectplm.rows)
        {
          var obj_selectplm = results_selectplm.rows[row_selectplm];
          var sqlqry_insertplmvpo =`INSERT INTO plm_items_vpo(vpono, fabyy_id, plm_item_id, plm_actual, plm_item_name, plm_item_desc, plm_colorway_type, plm_supplier, plm_fab_type, plm_cw, plm_placement, plm_color, item_comment, gmt_color_order)
            SELECT vpono,${obj_selectplm.fabyy_id},'${obj_selectplm.plm_item_id}','${obj_selectplm.plm_actual}','${obj_selectplm.plm_item_name}','${obj_selectplm.plm_item_desc}','${obj_selectplm.plm_colorway_type}','${obj_selectplm.plm_supplier}','${obj_selectplm.plm_fab_type}','${obj_selectplm.plm_cw}','${obj_selectplm.plm_placement}','${obj_selectplm.plm_color}','',${obj_selectplm.gmt_color_order} FROM olr_items WHERE fabyy_id='${var_fabyyid}' AND color IN (SELECT cw_name FROM plm_colorways WHERE fabyy_id='${var_fabyyid}' AND cw_order='${obj_selectplm.gmt_color_order}') ORDER BY vpono;`;
          
          const results_insertvpo = await query(sqlqry_insertplmvpo); 
        }

        res.status(200).json({Type: 'SUCCESS', Msg : 'PLM Material Combined With VPO Completed.'})
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