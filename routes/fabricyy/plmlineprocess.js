const { pool } = require('../dbconfig');

module.exports = async (req, res) => {

        const var_fabyyid = req.params.fabyyid;

        var sqlqry_deleteplmvpo =`DELETE FROM plm_items_vpo WHERE fabyy_id='${var_fabyyid}';`;

        const respose_delete = await query(sqlqry_deleteplmvpo);

        var sqlqry_selectplm =`SELECT * FROM plm_items WHERE fabyy_id='${var_fabyyid}' ORDER BY gmt_color_order;`;

        const results_selectplm = await query(sqlqry_selectplm);

        for (var i = 0; i < results_selectplm.rows.length; i++)
        {
          var sqlqry_insertplmvpo =`INSERT INTO plm_items_vpo(vpono, fabyy_id, plm_item_id, plm_actual, plm_item_name, plm_item_desc, plm_colorway_type, plm_supplier, plm_fab_type, plm_cw, plm_placement, plm_color, item_comment, gmt_color_order)
            SELECT vpono,${results_selectplm.rows[i].fabyy_id},'${results_selectplm.rows[i].plm_item_id}','${results_selectplm.rows[i].plm_actual}','${results_selectplm.rows[i].plm_item_name}','${results_selectplm.rows[i].plm_item_desc}','${results_selectplm.rows[i].plm_colorway_type}','${results_selectplm.rows[i].plm_supplier}','${results_selectplm.rows[i].plm_fab_type}','${results_selectplm.rows[i].plm_cw}','${results_selectplm.rows[i].plm_placement}','${results_selectplm.rows[i].plm_color}','',${results_selectplm.rows[i].gmt_color_order} FROM olr_items WHERE fabyy_id='${var_fabyyid}' AND color IN (SELECT cw_name FROM plm_colorways WHERE fabyy_id='${var_fabyyid}' AND cw_order='${results_selectplm.rows[i].gmt_color_order}') ORDER BY vpono;`;
          
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