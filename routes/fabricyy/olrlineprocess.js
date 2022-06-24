const { pool } = require('../dbconfig');
const moment = require('moment');

module.exports = async (req, res) => {

  const var_fabyyid = req.params.fabyyid;

  var result_del_olritems = await deleteRows(`DELETE FROM olr_items WHERE fabyy_id='${var_fabyyid}';`);

  var result_get_olrcolor = await selectFrom(`SELECT colorname,flex,vpono,division FROM olr_colorset WHERE fabyy_id='${var_fabyyid}' ORDER BY colorname,vpono,division;`);

  var result_get_olrsizes = await selectFrom(`SELECT sizename FROM olr_sizeset WHERE fabyy_id='${var_fabyyid}' ORDER BY sizename;`);

  if(result_get_olrcolor.Type === "SUCCESS")
  {

    if(result_get_olrsizes.Type === "SUCCESS")
    {
       

        let prom = await Promise.all(

            await result_get_olrcolor.Data.map(async (x) => 
            {
                var insertrow = await insertRows(`INSERT INTO olr_items(fabyy_id,color, flex, vpono, division, garmentway, prod_plant) VALUES ('${var_fabyyid}','${x.colorname}','${x.flex}','${x.vpono}','${x.division}','','');`);
            
                if(insertrow.Type === "SUCCESS")
                {
                        var i = 0;

                        return Promise.all(await result_get_olrsizes.Data.map(async (y) =>  
                        {
                            i = i+1;
                            var qry_update = `UPDATE olr_items SET s${i}_name='${y.sizename}', s${i}_qty=temptable.orderqty FROM (SELECT COALESCE(SUM(orderqty),0) as orderqty FROM olr_data WHERE fabyy_id='${var_fabyyid}' AND mastcolordesc='${x.colorname}' AND custsizedesc='${y.sizename}' AND vpono='${x.vpono}') AS temptable WHERE fabyy_id='${var_fabyyid}' AND color='${x.colorname}' AND vpono='${x.vpono}';`
                        
                            var result_update_olritems = await insertRows(qry_update);
                        }))
                } 
            })

        ).then(function(){
            res.status(200).json({ Type: "SUCCESS", Msg: "Item List Successfully Added."})
            return;
        })
    }
    else
    {
      res.status(200).json({ Type: "ERROR", Msg: "OLR size list processing not complete."})
      return;
    }
  }
  else
  {
    res.status(200).json({ Type: "ERROR", Msg: "OLR color list processing not complete."})
    return;
  }
      
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