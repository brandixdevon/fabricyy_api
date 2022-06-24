const { pool } = require('../dbconfig');
const axios = require('axios');

module.exports = async (req, res) => {

  //Check Body Is Empty

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {

    res.status(200).json({ Type: "ERROR", Msg: "Oops! Empty Data Set." })
    return;

  }

  //Check Element Count

  if (Object.keys(req.body).length != 3) {

    res.status(200).json({ Type: "ERROR", Msg: "Oops! Can't Find Correct Dataset" })
    return;

  }

  const var_fabricyyid = req.body.fabric_yyid;
  const var_itemset = req.body.itemset;
  const var_token = req.body.token;

  let xc = await deleteRows(`DELETE FROM plm_items WHERE fabyy_id='${var_fabricyyid}';`);

  let prom = await Promise.all( 
        await var_itemset.map(async (x) => {
             
            return Promise.all(
            await x.color_way_colors.map(async (y, index) => {
                
              var inc_val = index + 1;
                var nameofmatcolor = await getcolorname(y);
                
                new Promise(async function(){
                
                    var letterNumber_check = /^[0-9a-zA-Z]+$/;

                    if(nameofmatcolor.colorcode.match(letterNumber_check))
                    {
                        if(nameofmatcolor.node_name !== "")
                        { 
                            var sqlqry = `INSERT INTO plm_items(fabyy_id, plm_item_id, plm_actual, plm_item_name, plm_item_desc, plm_colorway_type, plm_supplier, plm_fab_type, plm_cw, plm_placement, plm_color, gmt_color_order)
                            VALUES ('${var_fabricyyid}', '${x.id}', '${x.actual}', '${x.item_name}', '${x.description}', '${x.color_way_type}', '${x.supplier}', '${x.material_type}', '${x.cuttable_width}', '${x.placement}', '${nameofmatcolor.node_name}', '${inc_val}');`;
                            
                            await pool.query(sqlqry);
                            
                        }
                        
                        /*if(x.material_type === "Embellishments and Graphics" || x.material_type === "Washes and Finishes")
                        {
                            var sqlqry = `INSERT INTO plm_items(fabyy_id, plm_item_id, plm_actual, plm_item_name, plm_item_desc, plm_colorway_type, plm_supplier, plm_fab_type, plm_cw, plm_placement, plm_color, item_comment, gmt_color_order)
                            VALUES ('${var_fabricyyid}', '${x.id}', '${x.actual}', '${x.item_name}', '${x.description}', '${x.color_way_type}', '${x.supplier}', '${x.material_type}', '${x.cuttable_width}', '${x.placement}', '${nameofmatcolor.node_name}', '','${inc_val}');`;
                            
                            await pool.query(sqlqry);
                        }*/
                    } 

                })
          
            
            }))
    
        })
    ).then(function()
    {
        res.status(200).json({ Type: "SUCCESS", Msg: "Item List Successfully Added."})
        return;
    })

    async function getcolorname(val_color)
    {
        var letterNumber = /^[0-9a-zA-Z]+$/;

            if(val_color.match(letterNumber))
            {
                let resp_1 = await axios.get(`https://brandix.centricsoftware.com/csi-requesthandler/api/v2/color_materials/${val_color}`, {
                    headers: {
                        Cookie:`${var_token}`
                    }
                    });

                    if(resp_1.status === 200)
                    {
                        return ({node_name: resp_1.data.node_name, node_id:resp_1.data.id, colorcode:val_color});
                    }
                    else
                    {
                        return ({node_name: '', colorcode:val_color});
                    } 
            }
            else
            {
                return ({node_name: '', colorcode:val_color});
            }
        
    }

    async function deleteRows(sqlqry_delete)
    {
        pool.query(sqlqry_delete, (error, results) => {
            if (error) {
              
              return false;
            }
            else {
             
              return true;
            }
        
          })
    }

    
};