const { pool } = require('../dbconfig');

module.exports = async (req, res) => {

  const var_fabyyid = req.params.fabyyid;

  
  var sqlqry_selectolr =`SELECT fabyy_id,color FROM olr_items WHERE fabyy_id='${var_fabyyid}' GROUP BY fabyy_id,color;`;
        pool.query(sqlqry_selectolr, (error_selectolr, results_selectolr) => {
            if (error_selectolr) {
                
            return({ Type: "ERROR", Msg: 'Data Not Update Successfully.' });
            }
            else {
               
                Promise.all( 
                    
                    results_selectolr.rows.map(async (x, index) => {
                        
                        var sqlqry_updateolr =`UPDATE olr_items SET wash_dye = subqry.washdye FROM 
                            (SELECT string_agg(Distinct(plm_item_desc), ',') AS washdye FROM plm_items 
                            WHERE plm_fab_type='Washes and Finishes' AND fabyy_id='${x.fabyy_id}' AND gmt_color_order IN 
                            (SELECT cw_order FROM plm_colorways WHERE fabyy_id='${x.fabyy_id}' AND cw_name='${x.color}')) AS subqry 
                            WHERE fabyy_id='${x.fabyy_id}' AND color='${x.color}';`;

                        let resp2 = await pool.query(sqlqry_updateolr);
                        
                    })
            
                ).then(function()
                {
                    res.status(200).json({Type: 'SUCCESS', Msg : 'Dye-Wash Details Syncing Completed.'})
                    return;
                })
            }

        })


}