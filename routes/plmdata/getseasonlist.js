const axios = require('axios')
const PLMURL = require('../plmurl')

module.exports = async (req, res) => {

    var styleid =  req.body.styleid;
    var usertoken =  req.body.token;

    var seasonlist = [];

    var enc_styleid = encodeURIComponent(styleid);
    var plmweburl = PLMURL.APIURL;

    const resp = await axios.get(`${plmweburl}/csi-requesthandler/api/v2/styles?node_name=${enc_styleid}&active=true&bx_style_status=Confirmed&skip=0&limit=50`, {
        headers: {
            Cookie:`${usertoken}`
        }
        });

        for (var i = 0; i < resp.data.length; i++)
        {
            var enc_seasonid = encodeURIComponent(resp.data[i].parent_season);

            let resp2 = await axios.get(`${plmweburl}/csi-requesthandler/api/v2/seasons/${enc_seasonid}`, {
            headers: {
                Cookie:`${usertoken}`
            }
            });
                
            seasonlist.push({idstyle:resp.data[i].id,idseason:resp2.data.id,fs:resp2.data.node_name});
        }
 
        res.status(200).json({Type: 'SUCCESS', Dataset : seasonlist})
        return;
        

};


