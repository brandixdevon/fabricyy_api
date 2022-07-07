const { pool } = require('../dbconfig');
const axios = require('axios');
const PLMURL = require('../plmurl');
var fs = require('fs');

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

    var plmweburl = PLMURL.APIURL;

    /* let ts = Date.now();
    var logger = fs.createWriteStream(`log_itemadd_${ts}.txt`, {
        flags: 'a' // 'a' means appending (old data will be preserved)
      }); */

    //logger.write(`======== Start \r\n\n`);

    var sqlqry_delete = `DELETE FROM plm_items WHERE fabyy_id='${var_fabricyyid}';`;

    var response_delete = await query(sqlqry_delete);
 
    for (var i = 0; i < var_itemset.length; i++)
    {
        for (var y = 0; y < var_itemset[i].color_way_colors.length; y++)
        {
            var inc_val = y + 1;
            var nameofmatcolor = await getcolorname(var_itemset[i].color_way_colors[y]);

            var letterNumber_check = /^[0-9a-zA-Z]+$/;

                if(nameofmatcolor.colorcode.match(letterNumber_check))
                {
                    if(nameofmatcolor.node_name !== "")
                    { 
                        var sqlqry_insert = `INSERT INTO plm_items(fabyy_id, plm_item_id, plm_actual, plm_item_name, plm_item_desc, plm_colorway_type, plm_supplier, plm_fab_type, plm_cw, plm_placement, plm_color, gmt_color_order)
                        VALUES ('${var_fabricyyid}', '${var_itemset[i].id}', '${var_itemset[i].actual}', '${var_itemset[i].item_name}', '${var_itemset[i].description}', '${var_itemset[i].color_way_type}', '${var_itemset[i].supplier}', '${var_itemset[i].material_type}', '${var_itemset[i].cuttable_width}', '${var_itemset[i].placement}', '${nameofmatcolor.node_name}', '${inc_val}');`;
                        
                        var response_insert = await query(sqlqry_insert);
                    }
                    else
                    {
                      //logger.write(`======== Color name Blank \r\n\n`);
                    }
                    
                    /*if(x.material_type === "Embellishments and Graphics" || x.material_type === "Washes and Finishes")
                    {
                        var sqlqry = `INSERT INTO plm_items(fabyy_id, plm_item_id, plm_actual, plm_item_name, plm_item_desc, plm_colorway_type, plm_supplier, plm_fab_type, plm_cw, plm_placement, plm_color, item_comment, gmt_color_order)
                        VALUES ('${var_fabricyyid}', '${x.id}', '${x.actual}', '${x.item_name}', '${x.description}', '${x.color_way_type}', '${x.supplier}', '${x.material_type}', '${x.cuttable_width}', '${x.placement}', '${nameofmatcolor.node_name}', '','${inc_val}');`;
                        
                        await pool.query(sqlqry);
                    }*/
                } 
        }
    }

    res.status(200).json({ Type: "SUCCESS", Msg: "Item List Successfully Added."})
    return;
 
    async function getcolorname(val_color)
    {
        var letterNumber = /^[0-9a-zA-Z]+$/;

            if(val_color.match(letterNumber) && val_color !== "centric%3A")
            {
                let resp_1 = await axios.get(`${plmweburl}/csi-requesthandler/api/v2/color_materials/${val_color}`, {
                    headers: {
                        Cookie:`${var_token}`
                    }
                    });

                    if(resp_1.status === 200)
                    {
                        //logger.write(`======== PLM Color Name Success ${resp_1.data.node_name} STATUS : ${resp_1.status} \r\n\n`);
                        return ({node_name: resp_1.data.node_name, node_id:resp_1.data.id, colorcode:val_color});
                    }
                    else
                    {
                        //logger.write(`======== PLM Color Name Error data not coming STATUS : ${resp_1.status} \r\n\n`);
                        return ({node_name: '', colorcode:val_color});
                    } 
            }
            else
            {
                //logger.write(`======== PLM Color Loading Error \r\n\n`);
                return ({node_name: '', colorcode:val_color});
            }
        
    }
 
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
    
};