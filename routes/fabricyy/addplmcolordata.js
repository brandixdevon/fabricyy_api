const { pool } = require('../dbconfig');
const moment = require('moment');
var fs = require('fs');

module.exports = async (req, res) => {

  //Check Body Is Empty

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {

    res.status(200).json({ Type: "ERROR", Msg: "Oops! Empty Data Set." })
    return;

  }

  //Check Element Count

  if (Object.keys(req.body).length != 2) {

    res.status(200).json({ Type: "ERROR", Msg: "Oops! Can't Find Correct Dataset" })
    return;

  }

  const var_fabricyyid = req.body.fabric_yyid;
  const var_colorset = req.body.colorset;

  /*let ts = Date.now();
    var logger = fs.createWriteStream(`log_coloradd_${ts}.txt`, {
        flags: 'a' // 'a' means appending (old data will be preserved)
      });
  logger.write(`======== Start \r\n\n`);*/

  var sqlqry_delete = `DELETE FROM plm_colorways WHERE fabyy_id='${var_fabricyyid}';`;

  var respose_delete = await query(sqlqry_delete);

  for (var row_index in var_colorset) {

    var obj_color = var_colorset[row_index];
    var colorname_new = await dyerootmap(obj_color.name);

    var sqlqry_insert = `INSERT INTO plm_colorways(fabyy_id, plm_cw_id, cw_name, cw_desc, colorway, garmentway,cw_order) VALUES ('${var_fabricyyid}','${obj_color.id}','${colorname_new}','${obj_color.name}','${obj_color.colorway}','${obj_color.garmentway}','${obj_color.seq}');`;
    var response_insert = await query(sqlqry_insert);
  }

  res.status(200).json({Type: 'SUCCESS', Dataset : "Successfully Added."})
  return;

    async function dyerootmap(value) {
      
      if(value.toUpperCase().includes('_HTR') === true)
      {
        return value.replace('_HTR','');
      }
      else if(value.toUpperCase().includes('_NATURAL') === true)
      {
        return value.replace('_Natural','');
      }
      else if(value.toUpperCase().includes('_PRINT') === true)
      {
        return value.replace('_Print','');
      }
      else if(value.toUpperCase().includes('_SOLID') === true)
      {
        return value.replace('_Solid','');
      }
      else if(value.toUpperCase().includes('_NDD') === true)
      {
        return value.replace('_NDD','');
      }
      else if(value.toUpperCase().includes('_YD') === true)
      {
        return value.replace('_YD','');
      }
      else if(value.toUpperCase().includes('_PD') === true)
      {
        return value.replace('_PD','');
      }
      else if(value.toUpperCase().includes('_SD') === true)
      {
        return value.replace('_SD','');
      }
      else if(value.toUpperCase().includes('_DSD') === true)
      {
        return value.replace('_DSD','');
      }
      else if(value.toUpperCase().includes('_PSD') === true)
      {
        return value.replace('_PSD','');
      }
      else if(value.toUpperCase().includes('_DD') === true)
      {
        return value.replace('_DD','');
      }
      else if(value.toUpperCase().includes('_ND') === true)
      {
        return value.replace('_ND','');
      }
      else if(value.toUpperCase().includes('_NPSD') === true)
      {
        return value.replace('_NPSD','');
      }
      else if(value.toUpperCase().includes('_NDD') === true)
      {
        return value.replace('_NDD','');
      }
      else if(value.toUpperCase().includes('_NPD') === true)
      {
        return value.replace('_NPD','');
      }
      else if(value.toUpperCase().includes('_PFD') === true)
      {
        return value.replace('_PFD','');
      }
      else
      {
        return value.toUpperCase();
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