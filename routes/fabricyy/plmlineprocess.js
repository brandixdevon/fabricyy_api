const { pool } = require('../dbconfig');

module.exports = async (req, res) => {

  const var_fabyyid = req.params.fabyyid;

  var sqlqry_deleteplmvpo =`DELETE FROM plm_items_vpo WHERE fabyy_id='${var_fabyyid}';`;

  pool.query(sqlqry_deleteplmvpo);
  
  var sqlqry_selectplm =`SELECT * FROM plm_items WHERE fabyy_id='${var_fabyyid}' ORDER BY gmt_color_order;`;
        pool.query(sqlqry_selectplm, (error_selectplm, results_selectplm) => {
            if (error_selectplm) {
                
            return({ Type: "ERROR", Msg: 'Data Not Update Successfully.' });
            }
            else {
               
                Promise.all( 
                    
                    results_selectplm.rows.map(async (x) => {
                        
                        var sqlqry_insertplmvpo =`INSERT INTO plm_items_vpo(vpono, fabyy_id, plm_item_id, plm_actual, plm_item_name, plm_item_desc, plm_colorway_type, plm_supplier, plm_fab_type, plm_cw, plm_placement, plm_color, item_comment, gmt_color_order)
                        SELECT vpono,${x.fabyy_id},'${x.plm_item_id}','${x.plm_actual}','${x.plm_item_name}','${x.plm_item_desc}','${x.plm_colorway_type}','${x.plm_supplier}','${x.plm_fab_type}','${x.plm_cw}','${x.plm_placement}','${x.plm_color}','',${x.gmt_color_order} FROM olr_items WHERE fabyy_id='${var_fabyyid}' AND color IN (SELECT cw_name FROM plm_colorways WHERE fabyy_id='${var_fabyyid}' AND cw_order='${x.gmt_color_order}') ORDER BY vpono;`;

                        let resp2 = await pool.query(sqlqry_insertplmvpo);
                        
                    })
            
                ).then(function()
                {
                    res.status(200).json({Type: 'SUCCESS', Msg : 'PLM Material Combined With VPO Completed.'})
                    return;
                })
            }

        })
 

}