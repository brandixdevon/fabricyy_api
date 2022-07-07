const { pool } = require('../dbconfig');

module.exports = async (req, res) => {

        const var_fabyyid = req.params.fabyyid;

  
        var sqlqry_selectolr =`SELECT fabyy_id,color FROM olr_items WHERE fabyy_id='${var_fabyyid}' GROUP BY fabyy_id,color;`;

        var results_selectolr = await query(sqlqry_selectolr);

        for (var i = 0; i < results_selectolr.rows.length; i++)
        {
            var sqlqry_updateolr =`UPDATE olr_items SET graphic = subqry.graphicno FROM 
                (SELECT string_agg(Distinct(plm_item_desc), ',') AS graphicno FROM plm_items 
                WHERE plm_fab_type='Embellishments and Graphics' AND fabyy_id='${results_selectolr.rows[i].fabyy_id}' AND gmt_color_order IN 
                (SELECT cw_order FROM plm_colorways WHERE fabyy_id='${results_selectolr.rows[i].fabyy_id}' AND cw_name='${results_selectolr.rows[i].color}')) AS subqry 
                WHERE fabyy_id='${results_selectolr.rows[i].fabyy_id}' AND color='${results_selectolr.rows[i].color}';`;

                var response_update = await query(sqlqry_updateolr);
        }

        res.status(200).json({Type: 'SUCCESS', Msg : 'Graphic Details Syncing Completed.'})
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