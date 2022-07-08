const { pool } = require('../dbconfig');

module.exports = async (req, res) => {

        const var_fabyyid = req.params.fabyyid;

        
        var sqlqry_selectolr =`SELECT fabyy_id,color FROM olr_items WHERE fabyy_id='${var_fabyyid}' GROUP BY fabyy_id,color;`;

        var results_selectolr = await query(sqlqry_selectolr);

        for (var row_selectolr in results_selectolr.rows)
        {
            var obj_selectolr = results_selectolr.rows[row_selectolr];
            var sqlqry_updateolr =`UPDATE olr_items SET wash_dye = subqry.washdye FROM 
            (SELECT string_agg(Distinct(plm_item_desc), ',') AS washdye FROM plm_items 
            WHERE plm_fab_type='Washes and Finishes' AND fabyy_id='${obj_selectolr.fabyy_id}' AND gmt_color_order IN 
            (SELECT cw_order FROM plm_colorways WHERE fabyy_id='${obj_selectolr.fabyy_id}' AND cw_name='${obj_selectolr.color}')) AS subqry 
            WHERE fabyy_id='${obj_selectolr.fabyy_id}' AND color='${obj_selectolr.color}';`;

            var respose_update_data = await query(sqlqry_updateolr);
        }
        
        res.status(200).json({Type: 'SUCCESS', Msg : 'Dye-Wash Details Syncing Completed.'})
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